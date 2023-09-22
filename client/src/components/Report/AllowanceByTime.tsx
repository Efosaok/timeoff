import React from "react";

const AllowanceByTime = () => {
  return (
    <div>
      <h1>Allowance usage</h1>

      <div className="row">
        {/* <div className="col-md-6 lead">Shows allowance usage in {{> reports/date_range_pretty same_month=same_month start_date=start_date_obj end_date=end_date_obj}}</div> */}
      </div>

      {/* {{> show_flash_messages }} */}

      <ol className="breadcrumb">
        <li><a href="/reports/">All reports</a></li>
        <li className="active">Allowance usage by time</li>
      </ol>

      <div className="row main-row_header">
        <span className="col-md-12">Filter</span>
      </div>

      <div className="row">
        <div className="col-md-12">

          <div className="panel panel-default">
            <div className="panel-body">

              <div className="row">

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="department_id">Department</label>
                    <select className="form-control" id="department_id" name="department">
                      <option>All</option>
                      {/* {{#each related_departments}} */}
                      {/* <option value="{{this.id}}" {{#if_equal this.id ../current_department.id}} selected {{/if_equal}}>{{this.name}}</option> */}
                      {/* {{/each}} */}
                    </select>
                  </div>
                </div>

                <div className="col-md-5 col-md-offset-1">
                  <div className="form-group">
                    <label>Date range within single year</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                      <input type="text" name="start_date" className="form-control" id="start_date" placeholder="From Month"
                        data-provide="datepicker" data-date-format="yyyy-mm" data-date-autoclose="1" data-date-min-view-mode="months"
                        value="{{start_date_str}}"
                      />
                      <span className="input-group-addon">(YYYY-MM)</span>
                      <span className="input-group-addon"><i className="fa fa-long-arrow-right"></i></span>
                      <input type="text" name="end_date" className="form-control" id="end_date" placeholder="To Month"
                        data-provide="datepicker" data-date-format="yyyy-mm" data-date-autoclose="1" data-date-min-view-mode="months"
                        value="{{end_date_str}}"
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
                    <button className="btn btn-link" type="submit" name="as-csv" value="1"
                      data-content="Download report as .CSV file"
                      data-placement="top"
                      data-toggle="popover"
                      data-trigger="focus hover"
                    ><i className="fa fa-download"></i> .csv</button>
                    <button className="btn btn-success" type="submit">Update results</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="row main-row_header">
        <span className="col-md-12">Report</span>
      </div>

      <div className="row">

        {/* {{# unless users_and_leaves }} */}
        <div className="col-md-12 text-muted">
          There are no users in selected department
        </div>
        {/* {{else}} */}

        <div className="col-md-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Employee full name</th>
                {/* {{# each users_and_leaves.0.statistics.leave_type_break_down.pretty_version}} */}
                {/* <th>{{this.name}}</th> */}
                {/* {{/each}} */}
                {/* <th>Days deducted from allowance<br>in {{> reports/date_range_pretty same_month=same_month start_date=start_date_obj end_date=end_date_obj}}</th> */}
              </tr>
            </thead>
            {/* {{# each users_and_leaves}}
              <tr data-vpp-user-list-row={{this.user.id}}>
                <td>{{#with this.user }}<a href="/users/edit/{{this.id}}/">{{ this.full_name }}</a>{{/with}}</td>
                {{#each statistics.leave_type_break_down.pretty_version }}
                <td data-vpp-leave-type-id="{{this.id}}">{{this.stat}}</td>
                {{/each}}
                <td data-vpp-deducted-days="1">{{ statistics.deducted_days }}</td>
              </tr>
            {{/each}} */}
          </table>
        </div>
        {/* {{/ unless}} */}
      </div>

    </div>
  );
};

export default AllowanceByTime;
