import React, { FC } from "react";
import { Link } from "react-router-dom";

interface AllowanceI {
  value: number;
  caption: number | string;
}
interface DptGeneralProps {
  department: Record<string, any>,
  users: Record<string, string>[],
  allowanceOptions: AllowanceI[],
}

const General: FC<DptGeneralProps> = ({ department, users, allowanceOptions }) => {
  return (
    <div className="general-departments">
      <form method="POST" action="/settings/departments/edit/{{ department.id }}/" id="department_edit_form">

        <div className="col-md-7">

          <ol className="breadcrumb">
            <li><Link to="/departments/" data-vpp-all-departments-link="1">All departments</Link></li>
            <li className="active">
              {department?.name}
            </li>
          </ol>

          <div className="form-group">
            <label htmlFor="name" className="control-label">Name</label>
            <input className="form-control" id="name" name="name" required value={department?.name} />
          </div>

          <div className="form-group">
            <label htmlFor="manager_id" className="control-label">Manager</label>
            <select className="form-control" name="boss_id" id="manager_id">
              {users?.map((user: any) => (
                <option value={user?.id}
                  selected={user?.id === department?.bossId}
                >
                  {user?.name} {user?.lastname}
                </option>
              ))}
            </select>
            <span className="help-block">
              Head of {department?.name} department. Main manager.
              <Link to={`/user/${department?.bossId}/`}>
                More details
                <i className="fa fa-angle-double-right" />
              </Link>
            </span>
          </div>

          <div className="form-group">
            <label className="control-label">Secondary supervisors (BETA)</label>
            <ul className="list-group no-bottom-space">
              {department?.supervisors?.map((sup: any) => (
                <li className="list-group-item">
                  <span />
                    <Link to={`/user/${sup?.id}/`}>
                      {sup?.name} {sup?.lastname}
                    </Link>
                    <button type="submit" name="remove_supervisor_id" value={sup?.id} className="pull-right btn btn-link btn-xs">
                      <i className="fa fa-trash" /> Remove
                    </button>
                  <span />
                </li>
              ))}

              <li className="list-group-item">
                <span />&nbsp;
                <Link className="pull-right btn btn-link btn-xs"
                  data-vpp-add-new-secondary-supervisor="1"
                  data-toggle="modal"
                  data-target="#add_secondary_supervisers_modal"
                  data-department_id={department?.id}
                  data-department_name={department?.name}
                  to="#"
                >
                  <i className="fa fa-plus" /> Add new secondary supervisor
                </Link>
                <span />
              </li>
            </ul>
            <span className="help-block">
              List of users who also could decide on leave requests from {department?.name} department's employees.
            </span>
          </div>


          <div className="form-group">
            <label htmlFor="allowance_select">Allowance</label>

            <select className="form-control" name="allowance" id="allowance_select">
              {allowanceOptions?.map((allowance) => (
                <option value={allowance?.value}
                  selected={department?.allowance === allowance?.value}
                >
                  {allowance?.caption}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="use_bank_holidays_inp" className="control-label">
              <input className="" id="use_bank_holidays_inp" name="include_public_holidays" type="checkbox"
              checked={department?.include_public_holidays}
              />
              Include public holidays
            </label>
            <span className="help-block">
              Determine if employees from {department?.name} have
              <Link to="/settings">bank holidays</Link> in addition to their allowance
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="is_accrued_allowance_inp" className="control-label">
              <input className="" id="is_accrued_allowance_inp" name="is_accrued_allowance" type="checkbox"
              checked={department?.is_accrued_allowance}
              />
              Accrued allowance
            </label>
            <span className="help-block">If enabled, holiday allowance starts to build up - or accrue - from the first day of employment. It accrues in proportion to the annual entitlement. E.g. an employee in the ninth month of employment would have built up 9/12ths (or three-quarters) of annual entitlement.</span>
          </div>
          </div>

        <div className="row">
          <div className="col-md-12">
            <button id="save_changes_btn" type="submit" className="btn btn-success pull-right single-click">Save changes to department</button>
            <a className="btn btn-link pull-right" href="/settings/departments/">Cancel</a>
          </div>
        </div>

        </form>
    </div>
  );
};

export default General;
