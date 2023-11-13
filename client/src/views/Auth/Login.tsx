import React from "react";
import { Link } from "react-router-dom";
import FlashMessages from "../../components/partials/bits/FlashMessages";
import ActionButton from "../../components/partials/button/ActionButton";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const { onChange, login, errors, isLoading } = useLogin();

  return (
    <div className="login">
      <h1>Login</h1>

      <FlashMessages errors={errors} />

      <form onSubmit={login} className="form-horizontal">

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
            <ActionButton
              nativeProps={{
                className: 'btn btn-success single-click',
                type: 'submit',
                onClick: login,
              }}
              isLoading={isLoading}
              text="Login"
            />
          </div>
          <div className="col-md-4">
            <p className="pull-right"><Link to="/forgot-password/">Forgot password?</Link>
            {/* {{#if allow_create_new_accounts }} | <a href="/register/">Register new company</a>{{/if}} */}
            </p>
          </div>
        </div>

      </form>

      <div className="row">&nbsp;</div>

    </div>
  );
};

export default Login;
