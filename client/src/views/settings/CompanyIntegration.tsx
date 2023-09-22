import React from 'react';
import useCompanyIntegration from './hooks/useCompanyIntegration';

const CompanyIntegration = () => {
  const { res } = useCompanyIntegration();

  return (
    <div className='company-integration'>
      <h1>Integration API (beta)</h1>

      <p className="lead">Configure access to account data via integration API</p>

      {/* {{> show_flash_messages }} */}

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
                  // {{# if company.integration_api_enabled }} checked="checked" {{/if}}
                  checked={res?.company?.integration_api_enabled}
                  name="integration_api_enabled"
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
                  <button type="submit" className="btn btn-default single-click" id="regenerate_token_btn" name="regenerate_token" value="1">Regenerate token</button>
                  <button type="submit" className="btn btn-success single-click" id="save_settings_btn">Save integration API configuration</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyIntegration;
