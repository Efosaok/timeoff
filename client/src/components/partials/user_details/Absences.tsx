import React from "react";
import { Link } from "react-router-dom";
import Page from "../bits/Page";
import UserRequestsGrouped from "../bits/UserRequestsGrouped";
import AllowanceBreakdown from "./AllowanceBreakdown";
import BreadCrumb from "./BreadCrumb";
import useUserAbsences from "./hooks/useUserAbsences";

const Absences = () => {
  const { res, isLoading, error } = useUserAbsences();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="absences">
        <div className="col-md-9">
          <form method="POST" action="/users/edit/{{employee.id}}/">

          {/* {{> user_details/breadcrumb employee=employee }} */}
          <BreadCrumb employee={res?.employee} />

          <div className="form-group">
            <label className="control-label">Overview</label>
            <div className="progress bigger">
              <div
                className="progress-bar progress-bar-success"
                style={{ width: `${res?.leave_statistics?.used_so_far_percent}%` }}
                data-content={`${res?.employee.name} ${res?.employee.lastname} in current year used ${res?.leave_statistics?.used_so_far} days from allowance`}
                data-placement="top"
                data-toggle="popover"
                data-trigger="focus hover"
              >
                {res?.leave_statistics?.used_so_far} days used so far
              </div>
              <div
                className="progress-bar progress-bar-warning"
                style={{ width: `${res?.leave_statistics?.remaining_percent}%` }}
                data-placement="top"
                data-toggle="popover"
                data-trigger="focus hover"
              >
                {res?.leave_statistics?.remaining} days remaining in current year
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label">Summary</label>
            <p>
              {res?.employee?.name} had {res?.allowanceMeta?.totalNumberOfDaysInAllowance} PTO days at the start of the year. How?
              <br />
              <br />
              {res?.employee?.name} carried over {res?.allowanceMeta?.carryOver} days from the previous year
              {' '}
              in addition to an allocation of {res?.allowanceMeta?.nominalAllowance} days per year.
              <br />
              <br />
              {res?.employee?.name} has used {res?.allowanceMeta?.numberOfDaysTakenFromAllowance} days from her allocation of
              {' '}
              {res?.allowanceMeta?.totalNumberOfDaysInAllowance} days and thus {res?.allowanceMeta?.numberOfDaysAvailableInAllowance <= 0 ? 'has a deficit of' : 'remains'} {res?.allowanceMeta?.numberOfDaysAvailableInAllowance} days having <br /> accrued {res?.allowanceMeta?.accruedDays} days at this time of the year </p>
          </div>

          <div className="form-group">
            <label className="control-label">
              Days available for {res?.employee?.name} to take this year
            </label>
            <p>
              {res?.allowanceMeta?.numberOfDaysAvailableInAllowance} out of
              {' '}
              {res?.allowanceMeta?.totalNumberOfDaysInAllowance} in allowance
            </p>
            <input id="days_remaining_inp" type="hidden" value="{{ user_allowance.number_of_days_available_in_allowance }} out of {{ user_allowance.total_number_of_days_in_allowance }}" />
          </div>

          <div className="form-group">
            <label className="control-label">Is Accrued Allowance?</label>
            <p>
              {res?.allowanceMeta?.isAccruedAllowance ? 'Yes' : 'No'}
            </p>
            <span className="help-block">
              The way of available allowance calculation is defined on department level. <Link to={`/departments/${res?.employee?.DepartmentId}`}>More details <i className="fa fa-angle-double-right"></i></Link>
            </span>
          </div>

          <div className="row">
            <div className="col-md-5">
              <dl>
                <dt>Absences used this year grouped by leave types</dt>
                  {res?.leave_type_statistics?.length ? (
                    <>
                      {res?.leave_type_statistics?.map((stat: any) => (
                        <dd>
                          <em>
                            {stat?.leave_type?.name}
                          </em>
                          <span className="pull-right">
                            {stat?.days_taken}
                            {stat?.leave_type?.limit ? `out of ${stat?.leave_type?.limit}` : null}
                          </span>
                        </dd>
                      ))}
                    </>
                  ): <dd className="text-muted">No approved requests so far.</dd>
                }
              </dl>
            </div>

            <div className="col-md-5 col-md-offset-2">
              <AllowanceBreakdown {...res?.allowanceMeta} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="carried_over_allowance_inp" className="control-label">Allowance carried over from previous year</label>
            <div className="input-group col-md-4">
              <input className="form-control" readOnly id="carried_over_allowance_inp" type="number" step="0.5" name="carried_over_allowance"
                value={res?.allowanceMeta?.carryOver || 0 } aria-describedby="carried_over_allowance_help"
              />
              <span className="input-group-addon">working days</span>
            </div>
            <div id="carried_over_allowance_help" className="help-block">
              <div>Allowance adjustment based on unused holidays from previous year.</div>
              <div>It is calculated at the beginning of current year.</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="adjustment_inp" className="control-label">Allowance adjustment in current year</label>
            <div className="input-group col-md-4">
              <input className="form-control" id="adjustment_inp" type="number" step="0.5" name="adjustment" value={res?.employee_adjustment || 0 } aria-describedby="adjustment_help" />
              <span className="input-group-addon">working days</span>
            </div>
            <div id="adjustment_help" className="help-block">
              <div>Tune allowance for this user in current year.</div>
              <div>Could be negative as well.</div>
              <div>The value is valid during current year. Next year it needs to be re-confirmed.</div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-12">
              <button id="save_changes_btn" type="submit" className="btn btn-success pull-right single-click">Save changes</button>
            </div>
          </div>
          </form>

          <div className="main-row_header">&nbsp;</div>

          <UserRequestsGrouped groups={res?.grouped_leaves} loggedUser={res?.loggedUser} metaData={res?.groupedLeavesMeta} />

        </div>

      </div>
    </Page>
  );
};

export default Absences;
