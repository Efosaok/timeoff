import moment from "moment";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CalendarCell from "../../components/partials/bits/CalendarCell";
import Page from "../../components/partials/bits/Page";
import useTeamView from "./useTeamView";

const TeamView = () => {
  const {
    teamViewData,
    isLoading,
    isGroupedMode,
    selectedDepartment,
    setSelectedDepartment,
    currentDate,
    error
  } = useTeamView();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="team-view">
        <h1>Team View</h1>

        <div className="row">
          <div className="col-md-6 lead">
            {teamViewData?.data?.loggedUser?.name} {teamViewData?.data?.loggedUser?.lastname}
            's team
            {' '}
            <Link to="/feeds/" data-toggle="tooltip" data-placement="right" title="Export Team View to external calendars">
              <span className="fa fa-rss" />
            </Link>
          </div>
          <div className="col-md-3 col-md-offset-3">
            <div className="btn-group btn-group-sm pull-right" role="group">
              <Link
                to={`/teamview/?date=${currentDate}&grouped_mode=0&save_grouped_mode=1&save_current_department=1&department=${selectedDepartment?.id}`}
                className="btn btn-default"
                aria-disabled={!isGroupedMode}
              >All</Link>
              <Link to={`/teamview/?date=${currentDate}&grouped_mode=1&save_grouped_mode=1&save_current_department=1&department=${selectedDepartment?.id}`} className="btn btn-default"
                aria-disabled={!!isGroupedMode}
              >By department</Link>
            </div>
          </div>
        </div>

        {/* {{> show_flash_messages }} */}

        <div className="row">&nbsp;</div>

        <nav>
          <div className="row">
            <div className="col-xs-2">
              <Link className="btn btn-link btn-lg" to={`/teamview/?date=${teamViewData?.data?.prev_date.slice(0, 7)}&department=${selectedDepartment?.id}`}>
                <span aria-hidden="true" className="fa fa-chevron-left" />
                {' '}
                {moment(teamViewData?.data?.prev_date).format('MMM')}
              </Link>
            </div>

            <div className="col-xs-8 calendar-section-caption">
                <button id="team_view_month_select_btn" className="btn btn-link btn-lg" data-tom="/calendar/teamview/?base_date=0" data-provide="datepicker" data-date-format="yyyy-mm" data-date-autoclose="1" data-date-min-view-mode="months">
                  {moment(teamViewData?.data?.base_date).format('MMMM, YYYY')}
                  {' '}
                  <i className="fa fa-angle-down" />
                </button>
            </div>

            <div className="col-xs-2">
              <Link className="btn btn-link btn-lg pull-right" to={`/teamview/?date=${teamViewData?.data?.next_date.slice(0, 7)}&department=${selectedDepartment?.id}`}>
                {moment(teamViewData?.data?.next_date).format('MMM')}
                {' '}
                <span aria-hidden="true" className="fa fa-chevron-right" />
              </Link>
            </div>
          </div>
        </nav>

        <div className="row">&nbsp;</div>

        {/* {{#if grouped_mode}} */}

        {isGroupedMode ? (
          <>
            {/* {{#each users_and_leaves_by_departments}} */}

            {teamViewData?.data?.users_and_leaves_by_departments?.map((dpts: any) => (
              <Fragment key={dpts?.departmentName}>
                <div className="row">
                  <div className="col-md-12">&nbsp;</div>
                </div>

                <div className="row clearfix">
                  <div className="col-md-12">
                    <table className="team-view-table table-hover">
                      <thead>
                      <tr>
                        <td className="team-view-header" colSpan={2}>
                          <div className="pull-left">
                            <h3>
                              {dpts?.departmentName}
                            </h3>
                          </div>
                        </td>

                        {dpts?.users_and_leaves?.[0]?.days?.map((day: any) => (
                          <td colSpan={2} className="team-view-header"><b>
                            {moment(day?.moment).format('dd')}
                          </b></td>
                        ))}
                      </tr>
                      </thead>

                      <tbody>
                        {dpts?.users_and_leaves?.map((leave: any) => (
                          <tr className="teamview-user-list-row"
                            data-vpp-user-list-row={leave?.user?.id}
                            key={leave?.user?.id}
                          >
                            <td className="left-column-cell cross-link user-details-summary-trigger"
                              data-user-id={leave?.user?.id}
                            >
                            {teamViewData?.data?.loggedUser ? (
                              <Link to={`/users/${leave?.user?.id}/`}>
                                {leave?.user?.name} {leave?.user?.lastname}
                              </Link>
                            ) : (
                              <span>
                                {leave?.user?.name} {leave?.user?.lastname}
                              </span>
                            )}
                            </td>
                            <td>
                              <span className="teamview-deducted-days"
                                data-placement="right"
                                data-toggle="popover"
                                data-trigger="focus hover"
                              >
                              {teamViewData?.data?.statistics ? teamViewData?.data?.statistics?.deducted_days : null}
                              </span>
                            </td>
                            {leave?.days?.map((day: any) => (
                              <CalendarCell key={day?.moment} day={day} />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Fragment>
            ))}

          </>
        ): (
          <div className="row clearfix">
            <div className="col-md-12">
              <table className="team-view-table table-hover">
                <thead>
                <tr>
                  <td className="team-view-header" colSpan={2}>
                    <div className="dropdown pull-left">
                      <button className="btn btn-default dropdown-toggle left-column-cell" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {selectedDepartment?.id ? selectedDepartment?.name : 'All departments'}
                        <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li>
                          <Link
                            to="?department=null&save_current_department=1"
                            onClick={() => setSelectedDepartment({ id: '', name: '' })}
                          >All
                          </Link>
                        </li>
                        <li role="separator" className="divider"></li>
                        {teamViewData?.data?.groups?.map((group: any) => (
                          <li key={group?.href}><Link to={group?.href} onClick={() => setSelectedDepartment(group)}>
                            {group?.name}
                          </Link></li>
                        ))}
                        <li role="separator" className="divider"></li>
                        {teamViewData?.data?.related_departments?.map((dpts: any) => (
                          <li key={dpts?.name}>
                            <Link
                              to={`?date=${teamViewData?.data?.base_date?.slice(0, 7)}&department=${dpts?.id}&save_current_department=1`}
                              onClick={() => setSelectedDepartment(dpts)}
                            >
                              {dpts?.name}
                            </Link></li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  {teamViewData?.data?.users_and_leaves?.[0]?.days?.map((day: any) => (
                    <td colSpan={2} className="team-view-header" key={day?.moment}><b>
                      {moment(day?.moment).format('dd')}
                    </b></td>
                  ))}
                </tr>
                </thead>

                <tbody>
                {teamViewData?.data?.users_and_leaves?.map((leave: any) => (
                  <tr className="teamview-user-list-row" 
                    data-vpp-user-list-row={leave?.user.id}
                    key={leave?.user.id}
                  >
                    <td className="left-column-cell cross-link user-details-summary-trigger"
                      data-user-id={leave?.user?.id}
                    >
                    {teamViewData?.data?.loggedUser ? (
                      <Link to={`/user/${leave?.user?.id}/`}>
                        {leave?.user?.name} {leave?.user?.lastname}
                      </Link>
                    ): (
                      <span>
                        {leave?.user?.name} {leave?.user?.lastname}
                      </span>
                    )}
                    
                    </td>
                    <td>
                      <span className="teamview-deducted-days"
                        // {{#if statistics }}
                        data-content="In {{as_date_formatted ../base_date 'MMMM, YYYY' }} {{# with this.user }}{{this.full_name}} used {{../statistics.deducted_days }} days from allowance{{/with}}"
                        data-placement="right"
                        data-toggle="popover"
                        data-trigger="focus hover"
                        // {{/if}}
                      >
                      {/* {{#if statistics }}{{ statistics.deducted_days }}{{/if}} */}
                      </span>
                    </td>
                    {leave?.days?.map((day: any) => (
                      <CalendarCell day={day} />
                    ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="row clearfix">&nbsp;</div>
      </div>
    </Page>
  )
};

export default TeamView;
