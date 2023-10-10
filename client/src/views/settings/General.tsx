import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import ColorPicker from "../../components/partials/bits/ColorPicker";
import FlashMessages from "../../components/partials/bits/FlashMessages";
import Page from "../../components/partials/bits/Page";
import ScheduleWidget from "../../components/partials/bits/ScheduleWidget";
import ActionButton from "../../components/partials/button/ActionButton";
import AddLeaveType from "../../components/partials/modals/AddLeaveType";
import { generateApiPath } from "../../utils/constants";
import useGeneralSettings from "./hooks/useGeneralSettings";

const General = () => {
  const {
    isLoading,
    countries,
    res,
    carryAllowanceOver,
    carryingOver,
    updateSchedule,
    updatingSchedule,
    onChangeSchedule,
    onChange,
    updateSettings,
    updatingSettings,
    toggleModal,
    deleteLeaveType,
    deletingLeaveType,
    messages,
    errors,
    selectedLeaveType,
    pageError,
  } = useGeneralSettings();

  return (
    <Page isLoading={isLoading} error={pageError}>
      <div className="general-settings">
        <h1>General settings</h1>

        <p className="lead">Account main settings</p>

        <FlashMessages messages={messages} errors={errors} />
        <div className="row">&nbsp;</div>

        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                Company
              </div>
              <div className="panel-body">
                <div className="row">

                  <div className="col-md-5">
                    <form className="form-horizontal" method="POST" action="/settings/company/" id="company_edit_form">
                      <div className="form-group">
                        <label htmlFor="input_company_name" className="col-md-4 control-label">Company name</label>
                        <div className="col-md-8">
                          <input onChange={onChange} className="form-control" id="input_company_name" placeholder="Our company name" defaultValue={res?.company?.name} name="name" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="input_country" className="col-md-4 control-label">Country</label>
                        <div className="col-md-8">
                          <select onChange={onChange} className="form-control" id="input_country" name="country">
                            {countries?.map((country: any) => (
                              <option
                                value={country?.[0]}
                                selected={country?.[0] === res?.company?.country}
                              >{country?.[0]}: {country?.[1]?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="input_date_format" className="col-md-4 control-label">Date format</label>
                        <div className="col-md-8">
                          <select onChange={onChange} className="form-control" id="input_date_format" name="date_format">
                            {res?.companyDateFormats?.map((format: any) => (
                              <option key={format} value={format}
                                selected={format === res?.company?.date_format}
                              >
                                {format}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="input_time_zone" className="col-md-4 control-label">Time zone</label>
                        <div className="col-md-8">
                          <select onChange={onChange} className="form-control" id="input_time_zone" name="timezone">
                            {res?.timezones_available?.map((timezone: any) => (
                              <option key={timezone} value={timezone} selected={timezone === res?.company?.timezone}>
                                {timezone}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>


                      <div className="form-group">
                        <label htmlFor="input_carry_over" className="col-md-4 control-label">Carried over days</label>
                        <div className="col-md-8">
                          <select onChange={onChange} className="form-control" id="input_carry_over" name="carry_over">
                            {res?.carryOverOptions?.map((carryOver: any) => (
                              <option key={carryOver?.days} value={carryOver?.days}
                                  selected={carryOver?.days === res?.company?.carry_over}
                                >
                                  {carryOver?.label}
                              </option>
                            ))}
                          </select>
                            <p>
                              <em>Number of days in employee allowance that are carried over to the next year.</em>
                            </p>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-md-offset-4 col-md-8">
                          <div className="checkbox">
                            <label htmlFor="share-all-absences">
                              <input onChange={onChange} id="share-all-absences" type="checkbox" name="share_all_absences"
                                defaultChecked={res?.shareAllAbsences}
                              />Share absences between employees
                            </label>
                            <p>
                              <em>If enabled all employees can see information about everybody's absences regardless departments.</em>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-md-offset-4 col-md-8">
                          <div className="checkbox">
                            <label htmlFor="is-team-view-hidden">
                              <input onChange={onChange} id="is-team-view-hidden" type="checkbox" name="is_team_view_hidden"
                                defaultChecked={res?.isTeamViewHidden}
                              />
                                Hide Team View page for non-admin users
                            </label>
                            <p>
                              <em>If marked Team view page is shown only to admin users.</em>
                            </p>
                          </div>
                        </div>
                      </div>


                      <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                          <ActionButton
                            nativeProps={{
                              className: 'btn btn-success pull-right single-click',
                              onClick: updateSettings,
                              type: 'button',
                            }}
                            isLoading={updatingSettings}
                            text="Save changes"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-offset-1 col-md-5">

                    <div className="form-horizontal">
                      <div className="form-group">
                        <label htmlFor="" className="col-md-7 control-label">Backup employees' leave data</label>
                      </div>
                      <div className="form-group">
                        <div className="col-md-offset-2">
                          <em>Download the full list of employees with all their leave requests. The file is in <strong>.CSV</strong> format which is compatible with MS Excel.</em>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-offset-2 col-md-11">
                          <a className="btn btn-success pull-right" href={generateApiPath('settings/company/backup/')}><i className="fa fa-download"></i> Download backup</a>
                        </div>
                      </div>
                    </div>

                    <div className="form-horizontal" id="company_schedule_form">
                      <input type="hidden" name="company_wide" value="1" />
                      <div className="form-group">
                        <label htmlFor="" className="col-md-6 control-label">Company week schedule</label>
                      </div>
                      <div className="form-group">
                        <div className="col-md-offset-2">
                          <ScheduleWidget {...res?.scheduleMeta} onChange={onChangeSchedule} />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-offset-2">
                          <em>Define company wide weekly schedule. Press correspondent button to toggle working/non-working day.</em>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-md-offset-2 col-md-11">
                          <ActionButton
                            nativeProps={{
                              type: 'button',
                              className: 'btn btn-success pull-right single-click',
                              onClick: updateSchedule,
                            }}
                            isLoading={updatingSchedule}
                            text="Save schedule"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-horizontal">
                      <div className="form-group">
                        <label htmlFor="" className="col-md-10 control-label">Calculate and carry over unused allowance</label>
                      </div>
                      <div className="form-group">
                        <div className="col-md-offset-2">
                          <p><em>This action will carry over unused allowance for each employee from
                          <strong> {res?.yearPrev} </strong>
                          to the current year, <strong> {res?.yearCurrent} </strong>.
                          </em></p>
                          <p><em>Please note, employees allowance is going to be updated.</em></p>
                        </div>
                      </div>
                      <div className="form-group">
                        <form className="col-md-offset-2 col-md-11" id="calculate_carry_over_form" method="post" action="/settings/carryOverUnusedAllowance">
                          <ActionButton
                            nativeProps={
                              {
                                className: 'btn btn-success pull-right single-click',
                                onClick: carryAllowanceOver,
                                type: 'button'
                              }
                            }
                            isLoading={carryingOver}
                          >
                            {!carryingOver ? <><i className="fa fa-share"></i>&nbsp;Carry over allowance</> : 'Carry over allowance'}
                          </ActionButton>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col-md-7">
            <div className="panel panel-default">
              <div className="panel-heading">
                Leave Types
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-6">
                    <label className="control-label">Leave Type Name</label>
                    <p><em>Tick one to always be on top of the list</em></p>
                  </div>
                  <div className="col-md-offset-3 col-md-2">
                    <label className="control-label">Limit</label>
                    <p><em>Days/year</em></p>
                  </div>
                </div>

                <div className="row">&nbsp;</div>

                <form id="delete_leavetype_form" method="post" action="/settings/leavetypes/delete/" />
                <form id="leave_type_edit_form" method="post" action="/settings/leavetypes/">

                {!res?.leave_types?.length ? (
                  <div className="row">
                    <div className="col-md-4">No Leave type records</div>
                  </div>
                ): null}

                {res?.leave_types?.map((type: any, i: number) => (
                  <>
                    <div className="row">
                      <div className="col-md-6">

                        <div className="input-group">
                          <span className="input-group-addon">
                            <input
                              type="radio"
                              name="first_record"
                              defaultValue={type?.id}
                              defaultChecked={!!type?.sort_order}
                            />
                          </span>
                          <input type="text" className="form-control" name={`name__${type?.id}`} value={type?.name} data-tom-leave-type-order={`name_${i}`} />

                          <div className="input-group-btn" data-tom-color-picker="1" data-tom-leave-type-order={`colour__${i}`}>
                            <input type="hidden" name={`colour__${type?.id}`} value={type?.color} />
                            <button type="button" className={classNames(`btn btn-default dropdown-toggle ${type?.color}`)} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-paint-brush"></i></button>
                            <ul className="dropdown-menu">
                              <ColorPicker />
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <input
                          name={`use_allowance__${type?.id}`}
                          id={`use_allowance__${type?.id}`}
                          type="checkbox"
                          defaultChecked={type?.use_allowance}
                          data-tom-leave-type-order={`allowance_${i}`}
                        />
                        {' '}
                        <label htmlFor={`use_allowance__${type?.id}`} className="control-label">Use allowance</label>
                      </div>
                      <div className="col-md-2">
                        <input type="number" className="form-control" defaultValue={type?.limit} name={`limit__${type.id}`} data-tom-leave-type-order={`limit_${i}`} />
                      </div>
                      <div className="col-md-1">
                        <ActionButton
                          nativeProps={{
                            className: 'btn btn-default pull-right leavetype-remove-btn',
                            onClick: () => deleteLeaveType(type?.id),
                            type: 'button',
                          }}
                          isLoading={deletingLeaveType && type?.id === selectedLeaveType}
                        >
                          {!(deletingLeaveType && type?.id === selectedLeaveType) ? <span className="fa fa-remove"></span> : null}
                        </ActionButton>
                      </div>
                    </div>

                    <div className="row">&nbsp;</div>
                  </>
                ))}

                <div className="row">&nbsp;</div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="pull-right">
                      <button className="btn btn-default" onClick={toggleModal} type="button" id="add_new_leave_type_btn">Add new</button>
                      {' '}
                      <button type="submit" className="btn btn-success single-click">Save changes</button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-5 setting-general-2nd-column">
            <div className="panel panel-default">
              <div className="panel-heading">
                Bank Holidays
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12 tst-no-bank-holidays">Bank holidays could be found <Link to="/bankholidays/">here</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-danger">
              <div className="panel-heading">
                <i className="fa fa-bomb"></i> Danger zone
              </div>
              <div className="panel-body">

                  <div className="col-md-12">

                    <div className="form-horizontal">
                      <div className="form-group">
                        <label htmlFor="" className="control-label">Remove company account</label>
                      </div>
                      <div className="form-group">
                        <div className="col-md-6">
                          <p><em>
                            Completely erase data associated with
                            {' '}
                            {/* {{company.name}}'s */}
                            {res?.company?.name}
                            {' '}
                            account.
                          </em></p>
                          <p><em> This action cannot be reverted.</em></p>
                          <p><em> It is strongly recommended to <Link to="/settings/company/backup/">download</Link> employees leave data first.</em></p>
                        </div>
                        <div className="col-md-6">
                          {/* <button className="btn btn-danger pull-right" data-toggle="modal" data-target="#remove_company_modal" type="button"><i className="fa fa-remove"></i> Delete company account</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddLeaveType toggleModal={toggleModal} />
    </Page>
  );
};

export default General;