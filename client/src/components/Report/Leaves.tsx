import React from "react";

const Leaves = () => {
  return (
    <div className="leaves">
      <h1>Leaves</h1>

      <div className="row">
        <div className="col-md-6 lead">Shows absences in a given period</div>
      </div>

      {/* {{> show_flash_messages }} */}

      <ol className="breadcrumb">
        <li><a href="/reports/">All reports</a></li>
        <li className="active">Absences</li>
      </ol>
      <div className="row main-row_header">
        <span className="col-md-12">Filter</span>
      </div>

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
                        value="{{startDateStr}}"
                      />
                      <span className="input-group-addon">(YYYY-MM-DD)</span>
                      <span className="input-group-addon"><i className="fa fa-long-arrow-right"></i></span>
                      <input type="text" name="end_date" className="form-control" id="end_date" placeholder="To Day"
                        data-provide="datepicker" data-date-format="yyyy-mm-dd" data-date-autoclose="1"
                        value="{{endDateStr}}"
                      />
                      <span className="input-group-addon">(YYYY-MM-DD)</span>
                    </div>
                    <span className="help-block">Date range that that contain either start or end of date of a leave</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="department_id">Department</label>
                    <select className="form-control" id="department_id" name="department">
                      <option>All</option>
                      {/* {{#each departments}}
                      <option value="{{this.id}}" {{#if_equal this.id ../departmentId}} selected="selected" {{/if_equal}}>{{this.name}}</option>
                      {{/each}} */}
                    </select>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="leave_type_id">Leave type</label>
                    <select className="form-control" id="leave_type_id" name="leave_type">
                      <option>All</option>
                      {/* {{#each leaveTypes}}
                      <option value="{{this.id}}" {{#if_equal this.id ../leaveTypeId}} selected="selected" {{/if_equal}}>{{this.name}}</option>
                      {{/each}} */}
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
                    <button className="btn btn-success single-click" type="submit">Update results</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="row main-row_header">
        <span className="col-md-12">Leaves</span>
      </div>

      <div className="row">
        {/* {{#unless leaves}} */}
        <div className="col-md-12 text-muted">
          There are no leave requests.
        </div>
        {/* {{else}} */}
        <div className="col-md-12">
          <p className="visible-xs-block"><em className="text-muted">Scroll table horizontally</em></p>
          <div className="table-responsive">
          <table className="table table-hover user-requests-table">
            <thead>
              <tr>
                {/* <th className="col-xs-2">Employee {{#if_equal sortBy 'employeeFullName'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="employeeFullName"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th>
                <th className="col-xs-2">Department {{#if_equal sortBy 'departmentName'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="departmentName"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th>
                <th className="col-xs-1">Type {{#if_equal sortBy 'type'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="type"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th>
                <th className="_col-xs-1">Days</th>
                <th className="col-xs-1">From {{#if_equal sortBy 'startDate'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="startDate"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th>
                <th className="col-xs-1">To {{#if_equal sortBy 'endDate'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="endDate"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th>
                <th className="col-xs-1">Status {{#if_equal sortBy 'status'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="status"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th>
                <th className="col-xs-1">Added {{#if_equal sortBy 'createdAt'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="createdAt"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th>
                <th className="col-xs-2">Approver {{#if_equal sortBy 'approver'}}<i className="fa fa-sort-alpha-asc"></i>{{else}}<button className="btn btn-link btn-xs" name="sort_by" type="submit" value="approver"><i className="fa fa-sort-asc"></i></button>{{/if_equal}}</th> */}
                <th className="col-xs-2">Comment</th>
              </tr>
            </thead>
            <tbody>
            {/* {{#each leaves }}
              <tr className="leave-request-row">
                <td>{{ this.employeeFullName }}</td>
                <td>{{ this.departmentName}}</td>
                <td>{{ this.type }}</td>
                <td>{{ this.deductedDays }}</td>
                <td>{{as_date this.startDate }}</td>
                <td>{{as_date this.endDate}}</td>
                <td>{{ this.status }}</td>
                <td>{{as_date_from_timestamp this.createdAt}}</td>
                <td>{{ this.approver }}</td>
                <td>{{ this.comment }}</td>
              </tr>
            {{/each }} */}
            </tbody>
          </table>
          </div>
        </div>
        {/* {{/unless}} */}
      </div>
    </div>
  )
};

export default Leaves;
