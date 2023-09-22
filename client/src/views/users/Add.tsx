import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../components/partials/button/ActionButton";
import useEmployeeAddition from "./hooks/useEmployeeAddition";

const Add = () => {
  const { res, inputs, onChange, adding, onSubmit } = useEmployeeAddition();

  return (
    <div className="add-user">
      <h1>New employee</h1>

      <div className="row">
        <div className="col-md-6 lead">Adding new employee account</div>
        <div className="col-md-6">
          <Link className="btn btn-default pull-right" to="/users/import/" id="import_users_btn">Import new employees <i className="fa fa-chevron-right"></i></Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <ol className="breadcrumb">
            <li><Link to="/users/">All Employees</Link></li>
            <li className="active">Add new employee</li>
          </ol>
        </div>
      </div>

      <div className="row main-row_header">
        <p className="col-md-12">Details of new employee</p>
      </div>

      <div className="row">
        <div className="col-md-12">

          <form className="form-horizontal" method="POST" action="/users/add/" id="add_new_user_form">

            <div className="form-group">
              <label htmlFor="name_inp" className="col-md-3 control-label">First Name</label>
              <div className="col-md-3">
                <input className="form-control" id="name_inp" name="name" required value={inputs?.name} onChange={onChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lastname_inp" className="col-md-3 control-label">Last Name</label>
              <div className="col-md-3">
                <input className="form-control" id="lastname_inp" name="lastname" required value={inputs?.lastname} onChange={onChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email_inp" className="col-md-3 control-label">Email Address</label>
              <div className="col-md-3">
                <input className="form-control" id="email_inp" type="email" name="email_address" onChange={onChange} required value={inputs?.email_address} aria-describedby="email_help" />
              </div>
              <span id="email_help" className="help-block col-md-6">Email address used by employee</span>
            </div>

            <div className="form-group">
              <label htmlFor="select_inp" className="col-md-3 control-label">Department</label>
              <div className="col-md-3">
                <select className="form-control" id="select_inp" name="department" value={inputs?.department} onChange={onChange} aria-describedby="department_help">
                  {res?.departments?.map((dpt: any, i: number) => (
                    <option key={dpt?.id} value={dpt?.id} data-vpp={i}>
                      {dpt?.name}
                    </option>
                  ))}
                </select>
              </div>
              <span id="department_help" className="help-block col-md-6">Department employee belongs to</span>
            </div>

            <div className="form-group">
              <div className="col-md-3 col-md-offset-3">
                <label htmlFor="admin_inp" className="_col-md-2 control-label">
                  <input className="" onChange={onChange} id="admin_inp" name="admin" type="checkbox" /> Is administrator user
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-3 col-md-offset-3">
                <label htmlFor="auto_approve_inp" className="control-label">
                  <input onChange={onChange} id="auto_approve_inp" name="auto_approve" type="checkbox" /> Auto approve leave requests
                </label>
              </div>
                <span className="help-block">Set the flag ON to streamline leave requests from this employee directly into <strong>Approved</strong> state.</span>
            </div>

            <div className="form-group">
              <label htmlFor="start_date_inp" className="col-md-3 control-label">Started on</label>
              <div className="col-md-3 date">
                <input
                  className="form-control"
                  id="start_date_inp"
                  type="date"
                  name="start_date"
                  onChange={onChange}
                  value={inputs?.start_date}
                  aria-describedby="start_date_help" />
              </div>
              <span id="start_date_help" className="help-block col-md-6">Date when employee started (inclusive)</span>
            </div>

            <div className="form-group">
              <label htmlFor="end_date_inp" className="col-md-3 control-label">Ended on</label>
              <div className="col-md-3 date">
                <input
                  className="form-control"
                  id="end_date_inp"
                  type="date"
                  name="end_date"
                  onChange={onChange}
                  value={inputs?.end_date}
                  aria-describedby="end_date_help"
                />
              </div>
              <span id="end_date_help" className="help-block col-md-6">
                <div>
                  Date when employee quits the
                  {res?.company?.name}
                </div><div>After this date the user is no longer able to access the application.</div><div>This is a way of deactivating user accounts.</div></span>
            </div>

            <div className="form-group">
              <label htmlFor="password_inp" className="col-md-3 control-label">Password</label>
              <div className="col-md-3 date">
                <input
                  className="form-control"
                  id="password_inp"
                  type="password"
                  name="password_one"
                  required
                  onChange={onChange}
                  value={inputs?.password_one}
                  readOnly={res?.company?.ldap_auth_enabled}
                  aria-describedby="password_inp_help"
                />
              </div>
              <span id="password_inp_help" className="help-block col-md-6">
                {res?.company?.ldap_auth_enabled ? (
                  <><Link to="/authentication/">LDAP authentication</Link> is enabled, so that password does not matter.</>
                ): `Define employee's password.`}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="password_inp" className="col-md-3 control-label">Confirm password</label>
              <div className="col-md-3">
                <input
                  className="form-control"
                  id="confirm_password_inp"
                  type="password"
                  name="password_confirm"
                  required
                  onChange={onChange}
                  value={inputs?.password_confirm}
                  readOnly={res?.company?.ldap_auth_enabled}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-offset-3 col-md-3">
                <ActionButton
                  nativeProps={{
                    type: 'button',
                    className: 'btn btn-success pull-right single-click',
                    onClick: onSubmit,
                  }}
                  text="Add new employee"
                  isLoading={adding}
                />
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Add;
