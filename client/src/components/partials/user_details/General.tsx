import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../button/ActionButton";
import BreadCrumb from "./BreadCrumb";
import useUserGeneralDetails from "./hooks/useUserGeneralDetails";

const General = () => {
  const { res, onChange, saveUserDetails, isLoading } = useUserGeneralDetails();

  return (
    <div className="general">
      <form method="POST" action="/users/edit/{{employee.id}}/">

        <div className="col-md-7">

          <BreadCrumb employee={res?.employee} />

          <div className="form-group">
            <label htmlFor="name_inp" className="control-label">First Name</label>
            <input onChange={onChange} className="form-control" id="name_inp" name="name" required defaultValue={res?.employee?.name} />
          </div>

          <div className="form-group">
            <label htmlFor="lastname_inp" className="control-label">Last Name</label>
            <input onChange={onChange} className="form-control" id="lastname_inp" name="lastname" required defaultValue={res?.employee?.lastname} />
          </div>

          <div className="form-group">
            <label htmlFor="email_inp" className="control-label">Email Address</label>
            <input onChange={onChange} className="form-control" id="email_inp" type="email" name="email_address" required defaultValue={res?.employee?.email} aria-describedby="email_help" />
            <span id="email_help" className="help-block">Email address used by this user</span>
          </div>

          <div className="form-group">
            <label htmlFor="select_inp" className="control-label">Department</label>
            <select onChange={onChange} className="form-control" id="select_inp" name="department" aria-describedby="department_help">
              {res?.departments?.map((dpt: any) => (
                <option defaultValue={dpt?.id}
                  selected={res?.employee?.DepartmentId === dpt?.id}
                >
                  {dpt?.name} (approver {dpt?.boss?.name} {dpt?.boss?.lastname})
                </option>
              ))}
            </select>
            <span id="department_help" className="help-block">
              Department current user is part of.
              {' '}
              <Link to={`/departments/${res?.employee?.DepartmentId}`}>
                More details
                <i className="fa fa-angle-double-right" />
              </Link>
            </span>
          </div>

          <div className="form-group">
              <label htmlFor="admin_inp" className="control-label">
                <input onChange={onChange} className="" id="admin_inp" name="admin" type="checkbox"
                defaultChecked={res?.employee?.admin}
                /> Is administrator user
              </label>
          </div>

          <div className="form-group">
              <label htmlFor="auto_approve_inp" className="control-label">
                <input onChange={onChange} className="" id="auto_approve_inp" name="auto_approve" type="checkbox"
                  defaultChecked={res?.employee?.auto_approve}
                /> Auto approve leave requests
              </label>
              <span className="help-block">
                Set the flag ON to streamline leave requests from {res?.employee?.name} {res?.employee?.lastname} directly into <strong>Approved</strong> state.</span>
          </div>

          <div className="form-group">
            <label htmlFor="start_date_inp" className="control-label">Started on</label>
            <div className="input-group col-md-4">
              <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
              <input onChange={onChange} className="form-control" id="start_date_inp" type="date" name="start_date" required data-date-autoclose="1" data-date-week-start="1" defaultValue={res?.employee?.start_date} aria-describedby="start_date_help" />
            </div>
            <span id="start_date_help" className="help-block">Date when employee started (inclusive)</span>
          </div>

          <div className="form-group">
            <label htmlFor="end_date_inp" className="control-label">Ended on</label>
            <div className="input-group col-md-4">
              <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
              <input onChange={onChange} className="form-control" id="end_date_inp" type="date" name="end_date" data-date-autoclose="1" data-date-week-start="1" defaultValue={res?.employee?.end_date} aria-describedby="end_date_help" />
            </div>
            <span id="end_date_help" className="help-block">
              <div>
                Date when user quits the
                {res?.company?.name}
                .
              </div>
              <div>After this date user is not able to access the company.</div><div>This is a way of deactivating user accounts.</div></span>
          </div>

          <div className="form-group">
            <label htmlFor="password_inp" className="control-label">Password</label>
            <input onChange={onChange} className="form-control" id="password_inp" type="password" name="password_one" defaultValue=""
              readOnly={res?.company?.ldap_auth_enabled}
              aria-describedby="password_inp_help"
            />
            <span id="password_inp_help" className="help-block">
              {res?.company?.ldap_auth_enabled ? (
                <>
                  <Link to="/authentication/">LDAP authentication</Link> is enabled, so that password does not matter.
                </>
              ) : 'It is possible to update password for given account.'}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="password_inp" className="control-label">Confirm password</label>
            <input onChange={onChange} className="form-control" id="confirm_password_inp" type="password" name="password_confirm" defaultValue=""
              readOnly={res?.company?.ldap_auth_enabled}
            />
          </div>

          <div className="form-group">
            <label htmlFor="link_to_email_audit" className="control-label">
              <Link to={`/audit/email/?user_id=${res?.employee?.id}`}>
                Emails ever sent to
                {' '}
                {res?.employee?.name} {res?.employee?.lastname}
              </Link>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ActionButton
              nativeProps={{
                type: 'button',
                className: 'btn btn-success pull-right single-click',
                onClick: saveUserDetails
              }}
              text="Save changes"
              isLoading={isLoading}
            />
            <Link className="btn btn-link pull-right" to="/users/">Cancel</Link>
          </div>
        </div>
      </form>

    </div>
  );
};

export default General;
