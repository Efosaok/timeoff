import React from 'react';

const ForgotPassword = () => {
  return (
    <div className='forgot-password'>
      <form className="form-horizontal" action="/forgot-password/" method="post">

        <div className="row">&nbsp;</div>

        <div className="form-group">
          <label htmlFor="email_inp" className="col-md-2 control-label col-md-offset-2">Employee email:</label>
          <div className="col-md-5">
            <input className="form-control" id="email_inp" type="text" name="email" required />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-offset-4 col-md-2">
            <button type="submit" className="btn btn-success single-click" id="submit_login">Send instructions</button>
          </div>
        </div>

      </form>

      <div className="row">&nbsp;</div>
    </div>
  );
};

export default ForgotPassword;
