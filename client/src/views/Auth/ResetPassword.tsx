import React from 'react';

const ResetPassword = () => {
  return (
    <div>
      <h1>Reset password</h1>

      {/* {{> show_flash_messages }} */}

      <form className="form-horizontal" action="/reset-password/" method="post">

        <div className="row">&nbsp;</div>

        <input type="hidden" name="t" value="{{token}}" />

        <div className="form-group">
          <label htmlFor="password_inp" className="col-md-2 control-label col-md-offset-2">New password:</label>
          <div className="col-md-5">
            <input className="form-control" id="password_inp" type="password" name="password" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirm_password_inp" className="col-md-2 control-label col-md-offset-2">Confirm new password:</label>
          <div className="col-md-5">
            <input className="form-control" id="confirm_password_inp" type="password" name="confirm_password" />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-offset-4 col-md-2">
            <button type="submit" className="btn btn-success single-click" id="submit_login">Save</button>
          </div>
        </div>

      </form>

      <div className="row">&nbsp;</div>

    </div>
  );
};

export default ResetPassword;
