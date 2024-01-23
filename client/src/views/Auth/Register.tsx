import React from "react";

const Register = () => {
  return (
    <div className="register">

      <h1>New company</h1>

      {/* {{> show_flash_messages }} */}

      <div className="row">
        <div className="col-md-6 lead">Register new company account and supervisor user</div>
      </div>

      <div className="row">
        <div className="col-md-9">
          <form className="form-horizontal" action="/register" method="post">

            <div className="form-group">
              <label htmlFor="company_name_inp" className="col-md-2 control-label">Company name</label>
              <div className="col-md-6">
                <input className="form-control" id="company_name_inp" placeholder="Company name" name="company_name" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name_inp" className="col-md-2 control-label">First Name</label>
              <div className="col-md-6">
                <input className="form-control" id="name_inp" placeholder="First name" name="name" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lastname_inp" className="col-md-2 control-label">Last Name</label>
              <div className="col-md-6">
                <input className="form-control" id="lastname_inp" placeholder="Last Name" name="lastname" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email_inp" className="col-md-2 control-label">Email Address</label>
              <div className="col-md-6">
                <input className="form-control" id="email_inp" type="email" placeholder="Email" name="email" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pass_inp" className="col-md-2 control-label">Password</label>
              <div className="col-md-6">
                <input className="form-control" id="pass_inp" type="password" placeholder="Password" name="password" required />
              </div>
            </div>


            <div className="form-group">
              <label htmlFor="confirm_pass_inp" className="col-md-2 control-label">Confirm Password</label>
              <div className="col-md-6">
                <input className="form-control" id="confirm_pass_inp" type="password" placeholder="Password" name="password_confirmed" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country_inp" className="col-md-2 control-label">Country</label>
              <div className="col-md-6">
                <select className="form-control" id="country_inp" name="country">
                  {/* {{#each countries}}
                  <option value="{{@key}}" {{#if this.default }} selected="selected" {{/if}}>{{@key}}: {{this.name}}</option>
                  {{/each}} */}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="timezone_inp" className="col-md-2 control-label">Time zone</label>
              <div className="col-md-6">
                <select className="form-control" id="timezone_inp" name="timezone">
                  {/* {{#each timezones_available}}
                  <option value="{{this}}" {{#if_equal this 'Europe/London' }} selected="selected" {{/if_equal}}>{{this}}</option>
                  {{/each}} */}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-offset-2 col-md-6">
                <button id="submit_registration" type="submit" className="btn btn-success">Create</button>
              </div>
            </div>

          </form>
        </div>

      </div>


    </div>
  );
};

export default Register;
