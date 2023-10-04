import React from "react";
import { Link } from "react-router-dom";
import CalendarCell from "../../components/partials/bits/CalendarCell";
import FlashMessages from "../../components/partials/bits/FlashMessages";
import Page from "../../components/partials/bits/Page";
import UserRequests from "../../components/partials/bits/UserRequests";
import AllowanceBreakdown from "../../components/partials/user_details/AllowanceBreakdown";
import { months } from "../../utils/constants";
import useCalendar from "./useCalendar";

const Calendar = () => {
  const {
    loggedUser,
    res,
    isLoading,
    showFullYear,
    error,
    messages,
    errors,
    updateFlash,
  } = useCalendar();

  return (
    <Page isLoading={isLoading} error={error} >
      <div className="calendar">
        <h1>Employee calendar</h1>

        <div className="row">
          <div className="col-md-6 lead">
            {loggedUser?.name} {loggedUser?.lastname}'s calendar for {res?.current_year}
          </div>
          <div className="col-md-6" />
        </div>

        <FlashMessages messages={messages} errors={errors} />

        <div className="row">&nbsp;</div>

        <div className="row main-row_header hidden-xs">
          <div className="col-md-12">Statistics</div>
        </div>

        <div className="row">

          <div className="col-md-3 top-leave-type-statistics">
            <dl>
              <dt data-tom-days-available-in-allowance>
                { res?.allowanceMeta?.numberOfDaysAvailableInAllowance }
              </dt>
              <dd>Days available</dd>
              <dd>out of <span data-tom-total-days-in-allowance>
                {res?.allowanceMeta?.totalNumberOfDaysInAllowance}
              </span> in allowance</dd>
            </dl>
          </div>

          <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
            <AllowanceBreakdown {...res?.allowanceMeta} previous_year={res?.previous_year} />
          </div>

          <div className="col-md-3 secondary-leave-type-statistics hidden-xs">
            <dl>
              <dt>Used so far</dt>

              {res?.leave_type_statistics?.length ?
                (
                  <>
                    {res?.leave_type_statistics?.map((leaveType: any) => (
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
                {res?.supervisors?.map((sup: any) => (
                  <span className="pull-right">
                    <a href={`mailto:${sup?.email}`}>
                      { sup.name } {sup.lastname}
                    </a>
                  </span>
                ))}
                { res?.supervisors?.map(() => <br />)}
              </dd>
              <dd>
                <em>Department:</em>
                <span className="pull-right">
                  <Link to={`/teamview/?department=${res?.current_user?.DepartmentId} `}>
                    {/* {{ current_user.department.name }} */}
                  </Link>
                </span>
              </dd>
              <dd>
                <em>Allowance in {res?.current_year}:</em>
                <span className="pull-right">
                  {res?.allowanceMeta?.totalNumberOfDaysInAllowance } days
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
              <Link className="btn btn-default" to={`/calendar/?year=${res?.previous_year}${showFullYear ? '&show_full_year=1' : ''}`}>
              <span aria-hidden="true" className="fa fa-chevron-left" />
              {' '}
              {res?.previous_year}
            </Link>
            ): null}
          </div>
          <div className="col-xs-8 calendar-section-caption">

            <strong>
                {showFullYear ? 'January - December' : 'Upcoming Months'}
            </strong>
            &nbsp;

            <Link className="btn btn-default" to={showFullYear ? '/calendar' : '/calendar/?show_full_year=1'}>
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
                <Link className="btn btn-default pull-right" to={`/calendar/?year=${res?.next_year}${showFullYear ? '&show_full_year=1' : ''}`}>
                  {res?.next_year} {' '}
                <span aria-hidden="true" className="fa fa-chevron-right" />
                </Link>
              </>
            ): null}
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <div className="row clearfix">

          {res?.calendar?.map((cal: any) => (
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
            <p className="col-md-12">All my absences in {res?.current_year}</p>
          </div>
          <UserRequests updateFlash={updateFlash} loggedUser={res?.loggedUser} leaves={res?.leaves} metaData={res?.leavesMeta}  />
          </>

        ) : null}
      </div>
    </Page>
  )
};

export default Calendar;
