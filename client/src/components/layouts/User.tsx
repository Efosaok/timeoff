import classNames from "classnames";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Page from "../partials/bits/Page";
import useUserLayoutLoader from "./useUserLayoutLoader";

const User = () => {
  const {
    res,
    isOnDetails,
    isOnAbsence,
    isOnCalendar,
    isOnSchedule,
    isLoading,
    error,
  } = useUserLayoutLoader();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="user">
        <h1>
          {res?.employee?.name} {res?.employee?.lastname}
          's details
          {!res?.employeeMeta?.isActive ? (
            <span className="badge alert-warning">Deactivated</span>
          ) : null}
          </h1>

          <div className="row">
            <div className="col-md-3 lead">Employee details</div>
            <form id="add_new_user_frm" method="post" action="/users/delete/{{employee.id}}/" onSubmit={() => {}}
            // "return confirm('Do you really want to delete the user {{employee.name}} {{employee.lastname}}?');"
            >
              <div className="col-md-1 col-md-offset-8">
              <button id="remove_btn" type="submit" className="pull-right btn btn-danger single-click" data-toggle="tooltip" data-placement="top" title="Remove employee"><i className="fa fa-trash"></i> Delete</button>
              </div>
            </form>
        </div>

        <div className="row">&nbsp;</div>

        {/* {{> show_flash_messages }} */}

        <div className="col-md-3 list-group">
          <Link to={`/user/${res?.employee?.id}/`} className={classNames('list-group-item', { 'selected-item': isOnDetails })}>General details</Link>
          <Link to={`/user/${res?.employee?.id}/schedule`} className={classNames('list-group-item', { 'selected-item': isOnSchedule })}>Schedule</Link>
          <Link to={`/user/${res?.employee?.id}/calendar`} className={classNames('list-group-item', { 'selected-item': isOnCalendar })}>Calendar</Link>
          <Link to={`/user/${res?.employee?.id}/absences`} className={classNames('list-group-item', { 'selected-item': isOnAbsence })}>Absences</Link>
        </div>

        <div className="detail">
          <Outlet context={res} />
        </div>

        <div className="row">&nbsp;</div>

      </div>
    </Page>
  );
}

export default User;