import React from 'react';
import FlashMessages from '../../components/partials/bits/FlashMessages';
import Page from '../../components/partials/bits/Page';
import ActionButton from '../../components/partials/button/ActionButton';
import useCompanyIntegration from './hooks/useCompanyIntegration';

const CompanyIntegration = () => {
  const {
    res,
    messages,
    errors,
    isLoading,
    saveIntegrationApiConfig,
    savingIntegrationApiConfig,
    isRegeneratingToken,
    onChange,
  } = useCompanyIntegration();

  return (
    <Page isLoading={isLoading} error="">
      <div className='company-integration'>
      <h1>Integration API (beta)</h1>

      <p className="lead">Configure access to account data via integration API</p>

      <FlashMessages messages={messages} errors={errors} />

      <div className="row main-row_header">
        <p className="col-md-12">Description</p>
      </div>

      <div className="row">
        <div className="col-md-8 col-md-offset-1">
          <p>Rocco's Collision PTO supports sharing
            {' '}
            <strong>
              {res?.company?.name}
              's
            </strong> data to other software via REST API.</p>
          <p>This page allows you to {res?.company?.integration_api_enabled ? 'disable' : 'enable'} access.</p>
        </div>
      </div>

      <div className="row main-row_header">
        <p className="col-md-12">Configuration</p>
      </div>

      <div className="row">
        <div className="col-md-12">
          <form className="form-horizontal" action="" method="post">
            <div className="form-group">
              <div className="col-md-9 col-md-offset-3">
              <label htmlFor="integration_api_enabled" className="control-label">
                <input
                  id="integration_api_enabled"
                  type="checkbox"
                  defaultChecked={res?.company?.integration_api_enabled}
                  name="integration_api_enabled"
                  onChange={onChange}
                />&nbsp;
                Enable integration API
                </label>
              </div>
            </div>
            <hr/>
            <div className="form-group">
              <label htmlFor="token" className="col-md-3 control-label">API access key</label>
              <div className="col-md-5">
                <input className="form-control" readOnly value={res?.company?.integration_api_token} aria-describedby="token_help" type="text" id="token-value" />
              </div>
              <span id="token_help" className="help-block">
                Token that allows access to
                {res?.company?.name}
                's data.
                {' '}
              <span className="danger">Keep it secret.</span></span>
            </div>
            <div className="form-group">
              <div className="col-md-offset-3 col-md-5">
                <div className="pull-right">
                  <ActionButton
                    nativeProps={{
                      type: 'button',
                      className: 'btn btn-default single-click',
                      onClick: () => saveIntegrationApiConfig('1'),
                    }}
                    isLoading={isRegeneratingToken}
                    text="Regenerate token"
                  />
                  {' '}
                  <ActionButton
                    nativeProps={{
                      type: 'button',
                      className: 'btn btn-success single-click',
                      onClick: () => saveIntegrationApiConfig(''),
                    }}
                    isLoading={savingIntegrationApiConfig}
                    text="Save integration API configuration"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Page>
  );
};

export default CompanyIntegration;
