import React from "react";
import { Link } from "react-router-dom";
import Page from "../../components/partials/bits/Page";
import AddNewDepartment from "../../components/partials/modals/AddNewDepartment";
import useDepartmentsOverview from "./hooks/useDepartmentsOverview";

const Overview = () => {
  const { res, isLoading, toggleModal, error } = useDepartmentsOverview();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="departments_overview">
        <h1>Departments</h1>

        {/* {{> show_flash_messages }} */}

        <div className="row">
          <div className="col-md-4 lead">All departments</div>
          <div className="col-md-4 col-md-offset-4">
            <button className="btn btn-info pull-right" data-toggle="modal" onClick={toggleModal} type="button" id="add_new_department_btn">Add new department</button>
          </div>
        </div>

        <div className="row">&nbsp;</div>

        {!res?.departments?.length ? (
          <div className="row">
            <div className="col-md-4">No department records</div>
          </div>
        ): (
          <div className="row">

            <div className="col-md-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Manager</th>
                    <th>Allowance</th>
                    <th>Number Employees</th>
                    <th>Public Holidays
                      <button type="button"
                        className="btn btn-xs btn-link"
                        data-content="If set to YES, employees from department have Bank Holidays added on top of their allowance"
                        data-placement="top"
                        data-toggle="popover"
                        data-trigger="focus hover"
                      >
                        <span className="fa fa-question-circle"> </span>
                      </button>
                    </th>
                    <th>Accrued Allowance
                      <button type="button"
                        className="btn btn-xs btn-link"
                        data-content="If set to YES, holiday allowance starts to build up - or accrue - from the first day of employment. It accrues in proportion to the annual entitlement. E.g. an employee in the ninth month of employment would have built up 9/12ths (or three-quarters) of annual entitlement."
                        data-placement="top"
                        data-toggle="popover"
                        data-trigger="focus hover"
                      >
                        <span className="fa fa-question-circle"> </span>
                      </button>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {res?.departments?.map((dpt: any) => (
                    <tr data-vpp-department-list-mode="readonly">
                      <td>
                        <Link to={`/departments/${dpt?.id}/`} data-vpp-department-name="1">
                          {dpt?.name}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/user/${dpt?.boss?.id}/`}>
                          {dpt?.boss?.name} {dpt?.boss?.lastname}
                        </Link>
                      </td>
                      <td>
                        {dpt?.allowance}
                      </td>
                      <td><Link to={`/users/?department=${dpt?.id}`}>
                        {dpt?.users?.length}
                      </Link></td>
                      <td>
                        {dpt?.include_public_holidays ? 'Yes' : null}
                      </td>
                      <td>
                        {dpt?.is_accrued_allowance ? 'Yes' : null}
                      </td>
                      <td><Link to={`/departments/${dpt?.id}`} className="btn btn-link btn-xs pull-right"><span className="fa fa-chevron-right"></span></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <AddNewDepartment
          allowanceOptions={res?.allowance_options}
          users={res?.company?.users}
        />
      </div>
    </Page>
  );
};

export default Overview;
