import React from "react";
import { Link } from "react-router-dom";
import Page from "../../components/partials/bits/Page";
import useEmployeeList from "./hooks/useEmployeeList";

const Users = () => {
  const {
    employeeList,
    isLoading,
    allDepartmentClass,
    getDepartmentClass,
    csvpath,
    error,
  } = useEmployeeList();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="users">
        <h1>Staff</h1>

        {/* {{> show_flash_messages }} */}

        <div className="row">
          <div className="col-md-3 lead">
            {/* {{company.name}} */}
            {employeeList?.data?.company?.name}
            's staff
          </div>
          <div className="col-md-3 col-md-offset-6">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Add new employee
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li><Link to="/users/import/" id="import_users_btn">Import employees</Link></li>
                <li><Link to="/users/add/" id="add_new_department">Add single employee</Link></li>
              </ul>
            </div>
            <form action={csvpath} method="GET">
              <input type="hidden" name="department" value="{{department_id}}" />
              <input type="hidden" name="as-csv" value="1" />
              <button
                className="btn btn-link pull-right single-click"
                type="submit"
                data-content="Download current page as .CSV file"
                data-placement="top"
                data-toggle="popover"
                data-trigger="focus hover"
              ><i className="fa fa-download"></i> .csv</button>
            </form>
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <div className="col-md-3 list-group all-departments">
          <Link to="/users/" className={allDepartmentClass}>All departments</Link>
            {employeeList?.data?.departments?.map((dpt: any) => (
              <Link key={dpt.name} className={getDepartmentClass(dpt?.id)} to={`/users/?department=${dpt?.id}`}>
                {dpt?.name}
              </Link>
            ))}
        </div>

        <div className="col-md-9">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Is Administrator?</th>
                <th>Available allowance</th>
                <th>Days used</th>
              </tr>
            </thead>
            <tbody>
              {employeeList?.data?.users_info?.map((user: any) => (
                <tr data-vpp-user-row={user?.user_id} key={user?.user_id}>
                <td className="user-link-cell">
                  <Link to={`/user/${user?.user_id}/`}>
                    {!user?.is_active ? (
                    <s>
                      {user?.user_full_name}
                    </s>
                    ) : user?.user_full_name}
                  </Link>
                </td>
                <td className="user_department">
                  <Link to={`/departments/${user?.department_id}/`}>
                    {user?.department_name}
                  </Link>
                </td>
                <td>
                  {user?.is_admin ? 'Yes' : null}
                </td>
                <td className="vpp-days-remaining">
                  { user?.number_of_days_available_in_allowance }
                </td>
                <td className="vpp-days-used">
                  { user?.number_of_days_taken_from_allowance}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row">&nbsp;</div>
      </div>
    </Page>
  );
};

export default Users;
