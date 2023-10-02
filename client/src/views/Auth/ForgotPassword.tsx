import React from 'react';
import FlashMessages from '../../components/partials/bits/FlashMessages';
import ActionButton from '../../components/partials/button/ActionButton';
import useForgotPassword from './hooks/useForgotPassword';

const ForgotPassword = () => {
  const {
    inputs,
    onChange,
    forgotPassword,
    messages,
    errors,
    isLoading,
  } = useForgotPassword();

  return (
    <div className='forgot-password'>
      <FlashMessages errors={errors} messages={messages} />
      <div>

        <div className="row">&nbsp;</div>

        <div className="form-group">
          <label htmlFor="email_inp" className="col-md-2 control-label col-md-offset-2">Employee email:</label>
          <div className="col-md-5">
            <input onChange={onChange} value={inputs.email} className="form-control" id="email_inp" type="text" name="email" required />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-offset-4 col-md-2">
            <ActionButton
              nativeProps={{
                type: 'button',
                className: 'btn btn-success single-click',
                onClick: forgotPassword,
              }}
              isLoading={isLoading}
              text="Send instructions"
            />
          </div>
        </div>

      </div>

      <div className="row">&nbsp;</div>
    </div>
  );
};

export default ForgotPassword;
