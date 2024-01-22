import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Page from "../partials/bits/Page";
import dateRangePretty from "./DateRangePretty";
import useAllowanceByTimeReports from "./hooks/useAllowanceByTimeReports";

const AllowanceByTime = () => {
  const {
    res,
    isLoading,
    error,
    currentDepartment,
    updateFilterParams,
    filterResults,
    csvActionPath,
  } = useAllowanceByTimeReports();

  return (
    <Page isLoading={isLoading} error={error}>
      <div>
        <h1>Allowance usage</h1>

        <div className="row">
          <div className="col-md-6 lead">Shows allowance usage in {
            dateRangePretty({
              startDate: res?.start_date,
              endDate: res?.end_date,
              sameMonth: res?.same_month
            })
          }</div>
        </div>

        {/* {{> show_flash_messages }} */}

        <ol className="breadcrumb">
          <li><Link to="/reports/">All reports</Link></li>
          <li className="active">Allowance usage by time</li>
        </ol>

        <div className="row main-row_header">
          <span className="col-md-12">Filter</span>
        </div>
        <form action={csvActionPath} method="GET">
          <div className="row">
            <div className="col-md-12">

              <div className="panel panel-default">
                <div className="panel-body">

                  <div className="row">

                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="department_id">Department</label>
                        <select className="form-control" id="department_id" onChange={(e) => updateFilterParams('department', e.target.value)}  name="department">
                          <option>All</option>
                          {res?.related_departments?.map((dep: any) => (
                            <option
                              key={dep?.id}
                              value={dep?.id}
                              selected={dep?.id === Number(currentDepartment)}
                            >
                              {dep?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-5 col-md-offset-1">
                      <div className="form-group">
                        <label>Date range within single year</label>
                        <div className="input-group">
                          <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                          <input type="text" name="start_date" className="form-control" id="start_date" placeholder="From"
                            data-provide="datepicker" data-date-format="yyyy-mm" data-date-autoclose="1" data-date-min-view-mode="months"
                            defaultValue={moment(res?.start_date)?.format('YYYY-MM')}
                          />
                          <span className="input-group-addon">(YYYY-MM)</span>
                          <span className="input-group-addon"><i className="fa fa-long-arrow-right"></i></span>
                          <input type="text" name="end_date" className="form-control" id="end_date" placeholder="To"
                            data-provide="datepicker" data-date-format="yyyy-mm" data-date-autoclose="1" data-date-min-view-mode="months"
                            defaultValue={moment(res?.end_date)?.format('YYYY-MM')}
                          />
                          <span className="input-group-addon">(YYYY-MM)</span>
                        </div>
                        <span className="help-block">Date range must be within a single year</span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group pull-right">
                        <button className="btn btn-link" name="as-csv" value="1" type="submit"
                          data-content="Download report as .CSV file"
                          data-placement="top"
                          data-toggle="popover"
                          data-trigger="focus hover"
                        >
                          <i className="fa fa-download"></i> .csv
                        </button>
                        <button className="btn btn-success" type="button" onClick={() => filterResults()}>Update results</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="row main-row_header">
          <span className="col-md-12">Report</span>
        </div>

        <div className="row">

          {res?.users_and_leaves?.length? (
            <div className="col-md-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Employee full name</th>
                    {res?.users_and_leaves?.[0]?.statistics?.leave_type_break_down?.pretty_version?.map((leaveType: any) => (
                      <th key={leaveType?.name}>{leaveType?.name}</th>
                    ))}
                    <th>Days deducted from allowance
                      <br /> in {
                          dateRangePretty({
                            startDate: res?.start_date,
                            endDate: res?.end_date,
                            sameMonth: res?.same_month
                          })
                        }
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {res?.users_and_leaves?.map((userAndLeave: any) => (
                    <tr key={userAndLeave.user.id}>
                      <td><Link to={`/user/${userAndLeave?.user?.id}/`}>{userAndLeave?.user?.name} {userAndLeave?.user?.lastname}</Link></td>
                      {userAndLeave?.statistics?.leave_type_break_down?.pretty_version?.map((lbreakDown: any) => (
                        <td data-vpp-leave-type-id={lbreakDown.id}>{lbreakDown?.stat}</td>
                      ))}
                      <td data-vpp-deducted-days="1">{ userAndLeave?.statistics.deducted_days }</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          ): (
            <>
              <div className="col-md-12 text-muted">
                There are no users in selected department
              </div>
            </>
          )}
        </div>

      </div>
    </Page>
  );
};

export default AllowanceByTime;
