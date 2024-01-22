import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Page from "../partials/bits/Page";
import useAllowanceByLeaves from "./hooks/useAllowanceByLeaves";
import SortByIcons from "./SortByIcons";

const Leaves = () => {
  const {
    isLoading,
    error,
    res,
    currentDepartment,
    currentLeaveType,
    currentSortBy,
    updateFilterParams,
    filterResults,
    csvActionPath,
  } = useAllowanceByLeaves();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="leaves">
        <h1>Leaves</h1>

        <div className="row">
          <div className="col-md-6 lead">Shows absences in a given period</div>
        </div>

        <ol className="breadcrumb">
          <li><Link to="/reports/">All reports</Link></li>
          <li className="active">Absences</li>
        </ol>
        <div className="row main-row_header">
          <span className="col-md-12">Filter</span>
        </div>

        <form method="GET" action={csvActionPath}>
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date range</label>
                        <div className="input-group">
                          <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                          <input type="text" name="start_date" className="form-control" id="start_date" placeholder="From Day"
                            data-provide="datepicker" data-date-format="yyyy-mm-dd" data-date-autoclose="1"
                            defaultValue={moment(res?.start_date).format('YYYY-MM-DD')}
                          />
                          <span className="input-group-addon">(YYYY-MM-DD)</span>
                          <span className="input-group-addon"><i className="fa fa-long-arrow-right"></i></span>
                          <input type="text" name="end_date" className="form-control" id="end_date" placeholder="To Day"
                            data-provide="datepicker" data-date-format="yyyy-mm-dd" data-date-autoclose="1"
                            defaultValue={moment(res?.end_date).format('YYYY-MM-DD')}
                          />
                          <span className="input-group-addon">(YYYY-MM-DD)</span>
                        </div>
                        <span className="help-block">Date range that that contain either start or end of date of a leave</span>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="department_id">Department</label>
                        <select onChange={(e) => updateFilterParams('department', e.target.value)} className="form-control" id="department_id" name="department">
                          <option>All</option>
                          {res?.departments?.map((dpt: any) => (
                            <option
                              value={dpt?.id}
                              selected={dpt?.id === currentDepartment}
                            >
                              {dpt?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="leave_type_id">Leave type</label>
                        <select onChange={(e) => updateFilterParams('leaveType', e.target.value)} className="form-control" id="leave_type_id" name="leave_type">
                          <option>All</option>
                          {res?.leaveTypes?.map((type: any) => (
                            <option
                              key={type?.id}
                              value={type?.id}
                              selected={type?.id === currentLeaveType}
                            >
                              {type?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group pull-right">
                        <button className="btn btn-link" type="submit" name="as-csv" value="1"
                          data-content="Download report as .CSV file"
                          data-placement="top"
                          data-toggle="popover"
                          data-trigger="focus hover"
                        ><i className="fa fa-download"></i> .csv</button>
                        <button className="btn btn-success single-click" type="button" onClick={() => filterResults()}>Update results</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="row main-row_header">
          <span className="col-md-12">Leaves</span>
        </div>

        <div className="row">
          {res?.leaves?.length ? (
            <div className="col-md-12">
              <p className="visible-xs-block"><em className="text-muted">Scroll table horizontally</em></p>
              <div className="table-responsive">
                <table className="table table-hover user-requests-table">
                  <thead>
                    <tr>
                      <th className="col-xs-2">Employee {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="employeeFullName"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="col-xs-2">Department {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="departmentName"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="col-xs-1">Type {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="type"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="_col-xs-1">Days</th>
                      <th className="col-xs-1">From {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="startDate"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="col-xs-1">To {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="endDate"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="col-xs-1">Status {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="status"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="col-xs-1">Added {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="createdAt"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="col-xs-2">Approver {' '}
                        <SortByIcons
                          currentSortBy={currentSortBy}
                          sortBy="approver"
                          sortAction={filterResults}
                        />
                      </th>
                      <th className="col-xs-2">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res?.leaves?.map((leave: any) => (
                      <tr className="leave-request-row">
                        <td>{leave.employeeFullName}</td>
                        <td>{leave.departmentName}</td>
                        <td>{leave.type}</td>
                        <td>{leave.deductedDays}</td>
                        <td>{leave.startDate}</td>
                        <td>{leave.endDate}</td>
                        <td>{leave.status}</td>
                        <td>{leave.createdAt}</td>
                        <td>{leave.approver}</td>
                        <td>{leave.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="col-md-12 text-muted">
              There are no leave requests.
            </div>
          )}
        </div>
      </div>
    </Page>
  )
};

export default Leaves;
