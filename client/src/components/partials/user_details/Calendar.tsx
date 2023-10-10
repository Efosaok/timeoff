import React from "react";
import { Link } from "react-router-dom";
import CalendarCell from "../bits/CalendarCell";
import Page from "../bits/Page";
import AllowanceBreakdown from "./AllowanceBreakdown";
import BreadCrumb from "./BreadCrumb";
import useUserCalendar from "./hooks/useUserCalendar";

const Calendar = () => {
  const { res, isLoading, error } = useUserCalendar();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="calendar">
        <div className="col-md-9">

          <BreadCrumb employee={res?.employee} />

          <div className="row">
            <div className="col-xs-2">
              <Link className="btn btn-default" to={`/user/${res?.employee?.id}/calendar/?year=${res?.previous_year}`}>
                <span aria-hidden="true" className="fa fa-chevron-left" /> {res?.previous_year}
              </Link>
            </div>
            <div className="col-xs-8 calendar-section-caption">
              <h3>
                {res?.current_year}
              </h3>
            </div>
            <div className="col-xs-2">
              {res?.show_full_year ? (
                <Link className="btn btn-default pull-right" to={`/user/${res?.employee?.id}/calendar/?year=${res?.next_year}&show_full_year=1`}>
                {res?.next_year} <span aria-hidden="true" className="fa fa-chevron-right" /></Link>
              ) : null}
            </div>
          </div>

          <div className="row main-row_header">
            <div className="col-md-12"><hr/></div>
          </div>

          <div className="row">

            <div className="col-md-4 top-leave-type-statistics">
              <dl>
                <dt data-tom-days-available-in-allowance>
                  {res?.allowanceMeta?.numberOfDaysAvailableInAllowance}
                  </dt>
                <dd>Days available</dd>
                <dd>out of <span data-tom-total-days-in-allowance>
                  {res?.allowanceMeta?.totalNumberOfDaysInAllowance}
                </span> in allowance</dd>
              </dl>
            </div>

            <div className="col-md-4 secondary-leave-type-statistics hidden-xs">
              <AllowanceBreakdown {...res?.allowanceMeta} previous_year={res?.previous_year} />
            </div>

            <div className="col-md-4 secondary-leave-type-statistics hidden-xs">
              <dl>
                <dt>Used</dt>
                {res?.leave_type_statistics ? (
                  <>
                    {res?.leave_type_statistics?.map((stat: any) => (
                      <dd>
                        <em>
                          {stat?.leave_type?.name}:
                        </em>
                        <span className="pull-right">
                          {stat?.days_taken}  {stat?.leave_type?.limit ? 'out of' : null}
                        </span>
                      </dd>
                    ))}
                  </>
                  ): <dd className="text-muted">No approved requests so far.</dd>
                }
              </dl>
            </div>

          </div>


          <div className="row main-row_header">
            <div className="col-md-12"><hr/></div>
          </div>

          <div className="row clearfix">
            {res?.calendar?.map((cal: any) => (
              <div className="col-md-4 month_container">
                <table className={`calendar_month month_${cal?.month}`}>
                <thead>
                <tr>
                  <td colSpan={14}>
                    {cal?.month}
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

        </div>
      </div>
    </Page>
  )
}

export default Calendar;
