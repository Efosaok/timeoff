import classNames from "classnames";
import React from "react";
import { toast } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import ConfirmationToast from "../partials/bits/ConfirmationToast";
import FlashMessages from "../partials/bits/FlashMessages";
import Page from "../partials/bits/Page";
import ActionButton from "../partials/button/ActionButton";
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
    messages,
    errors,
    outletContext,
    toastPromptMessage,
    onConfirmToast,
    deletingUser,
  } = useUserLayoutLoader();

  const promptUserDelete = () => toast((t) => (
    <ConfirmationToast confirmMessage="Delete" message={toastPromptMessage} onConfirm={() => onConfirmToast(t)} onDismiss={() => toast.dismiss(t.id)}  />
  ), { position: 'top-center', duration: 10000 });

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
            <div>
              <div className="col-md-1 col-md-offset-8">
              <ActionButton
                nativeProps={{
                  type: 'button',
                  className: 'pull-right btn btn-danger single-click',
                  onClick: promptUserDelete,
                  title: 'Remove employee',
                }}
                isLoading={deletingUser}
              >
                {!deletingUser ? (<i className="fa fa-trash">&nbsp;</i>) : null} Delete
              </ActionButton>
              </div>
            </div>
        </div>

        <div className="row">&nbsp;</div>
        <FlashMessages messages={messages} errors={errors} />

        <div className="col-md-3 list-group">
          <Link to={`/user/${res?.employee?.id}/`} className={classNames('list-group-item', { 'selected-item': isOnDetails })}>General details</Link>
          <Link to={`/user/${res?.employee?.id}/schedule`} className={classNames('list-group-item', { 'selected-item': isOnSchedule })}>Schedule</Link>
          <Link to={`/user/${res?.employee?.id}/calendar`} className={classNames('list-group-item', { 'selected-item': isOnCalendar })}>Calendar</Link>
          <Link to={`/user/${res?.employee?.id}/absences`} className={classNames('list-group-item', { 'selected-item': isOnAbsence })}>Absences</Link>
        </div>

        <div className="detail">
          <Outlet context={outletContext} />
        </div>

        <div className="row">&nbsp;</div>

      </div>
    </Page>
  );
}

export default User;