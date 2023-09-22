import React from "react";
import FlashMessages from "../../components/partials/bits/FlashMessages";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const { onChange, login, error } = useLogin();

  return (
    <div className="login">
      <h1>Login</h1>

      <FlashMessages errors={error?.response?.data?.errors} />

      <div className="form-horizontal">

        <div className="row">&nbsp;</div>

        <div className="form-group">
          <label htmlFor="email_inp" className="col-md-2 control-label col-md-offset-2">Employee email:</label>
          <div className="col-md-5">
            <input className="form-control" id="email_inp" type="text" name="username" onChange={onChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="pass_inp" className="col-md-2 control-label col-md-offset-2">Password</label>
          <div className="col-md-5">
            <input className="form-control" id="pass_inp" type="password" name="password" onChange={onChange} required />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-offset-4 col-md-1">
            <button onClick={login} className="btn btn-success single-click" id="submit_login">Login</button>
          </div>
          <div className="col-md-4">
            <p className="pull-right"><a href="/forgot-password/">Forgot password?</a>
            {/* {{#if allow_create_new_accounts }} | <a href="/register/">Register new company</a>{{/if}} */}
            </p>
          </div>
        </div>

      </div>

      <div className="row">&nbsp;</div>

    </div>
  );
};

export default Login;
