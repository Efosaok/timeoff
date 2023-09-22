import React from "react";
import { Link } from "react-router-dom";
import CalendarCell from "../../components/partials/bits/CalendarCell";
import Page from "../../components/partials/bits/Page";
import UserRequests from "../../components/partials/bits/UserRequests";
import AllowanceBreakdown from "../../components/partials/user_details/AllowanceBreakdown";
import { months } from "../../utils/constants";
import useCalendar from "./useCalendar";

const Calendar = () => {
  const {
    loggedUser, calData, isLoading, showFullYear, toggleShowFullYear,
  } = useCalendar();

  return (
    <Page isLoading={isLoading} error="" >
      {calData ? (
        <div className="calendar">
          <h1>Employee calendar</h1>

          <div className="row">
            <div className="col-md-6 lead">
              {loggedUser?.name} {loggedUser?.lastname}'s calendar for {calData?.data?.current_year}
            </div>
            <div className="col-md-6" />
          </div>

          {/* {{> show_flash_messages }} */}

          <div className="row">&nbsp;</div>

          <div className="row main-row_header hidden-xs">
            <div className="col-md-12">Statistics</div>
          </div>

          <div className="row">

            <div className="col-md-3 top-leave-type-statistics">
              <dl>
                <dt data-tom-days-available-in-allowance>
                  { calData?.data?.user_allowance?._carry_over - calData?.data?.user_allowance?._number_of_days_taken_from_allowance }
                </dt>
                <dd>Days available</dd>
                <dd>out of <span data-tom-total-days-in-allowance>
                  {calData?.data?.user_allowance?._carry_over}
                </span> in allowance</dd>
              </dl>
            </div>

            <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
              <AllowanceBreakdown {...calData?.data?.allowanceMeta} previous_year={calData?.data?.previous_year} />
            </div>

            <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
              <dl>
                <dt>Used so far</dt>

                {calData?.data?.leave_type_statistics ?
                  (
                    <>
                      {calData?.data?.leave_type_statistics?.map((leaveType: any) => (
                        <dd>
                          <em> {leaveType?.leave_type?.name}:</em>
                          <span className="pull-right">
                            {leaveType?.days_taken} {leaveType?.leave_type?.limit ? `out of ${leaveType?.leave_type?.limit}` : null}
                          </span>
                        </dd>
                      ))}
                    </>
                  ) :
                  (<dd className="text-muted">No approved requests so far.</dd>)
                }
              </dl>
            </div>

            <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
              <dl>
                <dt>Details</dt>
                <dd>
                  <em>
                    Supervisor:
                  </em>
                  {calData?.data?.supervisors?.map((sup: any) => (
                    <span className="pull-right">
                      <a href={`mailto:${sup?.email}`}>
                        { sup.name } {sup.lastname}
                      </a>
                    </span>
                  ))}
                  { calData?.data?.supervisors?.map(() => <br />)}
                </dd>
                <dd>
                  <em>Department:</em>
                  <span className="pull-right">
                    <Link to={`/teamview/?department=${calData?.data?.current_user?.DepartmentId} `}>
                      {/* {{ current_user.department.name }} */}
                    </Link>
                  </span>
                </dd>
                <dd>
                  <em>Allowance in {calData?.data?.current_year}:</em>
                  <span className="pull-right">
                    {calData?.data?.user_allowance._carry_over } days
                  </span>
                </ dd>
              </dl>
            </div>

          </div>

          <div className="row" />

          <div className="row main-row_header">
            <div className="col-md-12">Calendar <Link to="/feeds/" data-toggle="tooltip" data-placement="right" title="Export absences  to external calendars"><span className="fa fa-rss"></span></Link></div>
          </div>

          <div className="row">
            <div className="col-xs-2">
              {showFullYear ? (
                <a className="btn btn-default" href="/calendar/?year={{previous_year}}{{#if show_full_year}}&show_full_year=1{{/if}}">
                <span aria-hidden="true" className="fa fa-chevron-left" />
                {calData?.data?.previous_year}
              </a>
              ): null}
            </div>
            <div className="col-xs-8 calendar-section-caption">

              <strong>
                  {showFullYear ? 'January - December' : 'Upcoming Months'}
              </strong>
              &nbsp;

              <Link className="btn btn-default" to="#" onClick={toggleShowFullYear}>
                {showFullYear ? (
                  <>Less... &nbsp;<span className="fa fa-minus"></span></>
                ): (
                  <>More... &nbsp;<span className="fa fa-plus"></span></>
                )}
              </Link>


            </div>
            <div className="col-xs-2">
              {showFullYear ?
              (
                <>
                  <Link className="btn btn-default pull-right" to="/calendar/?year={{next_year}}{{#if show_full_year}}&show_full_year=1{{/if}}">
                    {calData?.data?.next_year}
                  <span aria-hidden="true" className="fa fa-chevron-right" />
                  </Link>
                </>
              ): null}
            </div>
          </div>

          <div className="row">&nbsp;</div>

          <div className="row clearfix">

            {calData?.data?.calendar?.map((cal: any) => (
              <div className="col-md-3 month_container">
                <table className={`calendar_month month_${cal?.month}`}>
                <thead>
                <tr>
                    <td colSpan={14}>
                      {showFullYear ? cal?.month : (
                        <span>{months[new Date(cal?.moment).getMonth()]}, {new Date(cal?.moment).getFullYear()}</span>
                        )}
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>S</td>
                    <td colSpan={2}>M</td>
                    <td colSpan={2}>T</td>
                    <td colSpan={2}>W</td>
                    <td colSpan={2}>T</td>
                    <td colSpan={2}>F</td>
                    <td colSpan={2}>S</td>
                </tr>
                </thead>
                <tbody>
                {cal?.weeks?.map((week: any) => (
                  <tr>
                    {week?.map((day: any) => (
                      <CalendarCell day={day} />
                    ))}
                  </tr>
                ))}

                </tbody></table>
            </div>
            ))}

          </div>

          {!showFullYear ? (

            <>
            <div className="row main-row_header">
              <p className="col-md-12">All my absences in {calData?.data?.current_year}</p>
            </div>
            <UserRequests loggedUser={calData?.data?.loggedUser} leaves={calData?.data?.leaves} metaData={calData?.data?.leavesMeta}  />
            </>

          ) : null}

        </div>
      ): null}
    </Page>
  )
};

export default Calendar;
