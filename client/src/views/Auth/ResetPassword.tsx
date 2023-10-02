import React from 'react';
import FlashMessages from '../../components/partials/bits/FlashMessages';
import ActionButton from '../../components/partials/button/ActionButton';
import useResetPassword from './hooks/useResetPassword';

const ResetPassword = () => {
  const {
    errors,
    resetPassword,
    onChange,
    isLoading,
  } = useResetPassword();

  return (
    <div>
      <h1>Reset password</h1>

      <FlashMessages errors={errors} />

      <div>

        <div className="row">&nbsp;</div>

        <div className="form-group">
          <label htmlFor="password_inp" className="col-md-2 control-label col-md-offset-2">New password:</label>
          <div className="col-md-5">
            <input onChange={onChange} className="form-control" id="password_inp" type="password" name="password" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirm_password_inp" className="col-md-2 control-label col-md-offset-2">Confirm new password:</label>
          <div className="col-md-5">
            <input onChange={onChange} className="form-control" id="confirm_password_inp" type="password" name="confirm_password" />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-offset-4 col-md-2">
            <ActionButton
              nativeProps={{
                type: 'submit',
                className: 'btn btn-success single-click',
                onClick: resetPassword,
              }}
              isLoading={isLoading}
              text="Save"
            />
          </div>
        </div>

      </div>

      <div className="row">&nbsp;</div>

    </div>
  );
};

export default ResetPassword;
