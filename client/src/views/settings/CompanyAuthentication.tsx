import React from 'react';
import FlashMessages from '../../components/partials/bits/FlashMessages';
import Page from '../../components/partials/bits/Page';
import ActionButton from '../../components/partials/button/ActionButton';
import useCompanyAuthentication from './hooks/useCompanyAuthentication';

const CompanyAuthentication = () => {
  const {
    res,
    isLoading,
    saveLdap,
    savingLdap,
    onChange,
    messages,
    errors,
  } = useCompanyAuthentication();

  return (
    <Page isLoading={isLoading} error="">
      <div className='company-authentication'>
        <h1>LDAP authentication</h1>

        <p className="lead">LDAP authentication details</p>

        {/* {{> show_flash_messages }} */}
        <FlashMessages messages={messages} errors={errors} />

        <div className="row main-row_header">
          <p className="col-md-12">Description</p>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-offset-1">
            <p>Rocco's Collision PTO supports LDAP authentication for customers that want to integrate the application with the rest of their infrastructure. The obvious reason is to allow employees to reuse their Active directory credentials in Rocco's Collision PTO.</p>

            <p>This page allows you to setup Rocco's Collision PTO to communicate with a custom LDAP server.</p>

            <p>Please note that employees have to use their <strong>LDAP email</strong> with <strong>LDAP password</strong> (rather than username). This is due to the multi-tenant nature of the Rocco's Collision PTO application that allows hosting more than one company within a single installation.</p>

            <p>Form below has placeholders with examples how to setup the Rocco's Collision PTO to use free test LDAP server described <a href="http://www.forumsys.com/en/tutorials/integration-how-to/ldap/online-ldap-test-server/">here</a>.</p>

          </div>

        </div>

        <div className="row main-row_header">
          <p className="col-md-12">Configuration</p>
        </div>

        <div className="row">

          <div className="col-md-12">

            <div className="form-horizontal">

              <div className="form-group">
                <div className="col-md-9 col-md-offset-3">
                <label htmlFor="ldap_auth_enabled" className="control-label">
                  <input
                    id="ldap_auth_enabled"
                    type="checkbox"
                    defaultChecked={res?.company?.ldap_auth_enabled}
                    name="ldap_auth_enabled"
                    onChange={onChange}
                  />&nbsp;
                  Enable LDAP authentication
                  </label>
                </div>
              </div>

              <hr/>

              <div className="form-group">
                <label htmlFor="ldap_url" className="col-md-3 control-label">URL to LDAP server</label>
                <div className="col-md-5">
                  <input onChange={onChange} className="form-control" id="ldap_url" placeholder="ldap://ldap.forumsys.com:389" name="url" defaultValue={res?.ldap_config?.url} aria-describedby="ldap_url_help" />
                </div>
                <span id="ldap_url_help" className="help-block">The URL must contain the protocol and port parts</span>
                <div className="col-md-9 col-md-offset-3">
                  <label htmlFor="allow_unauthorized_cert" className="control-label">
                    <input
                      onChange={onChange}
                      id="allow_unauthorized_cert"
                      type="checkbox"
                      defaultChecked={res?.ldap_config?.allow_unauthorized_cert}
                      name="allow_unauthorized_cert"
                    />&nbsp;
                    Allow unauthorized SSL certificate (if LDAPS is used)
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ldap_bindn" className="col-md-3 control-label">BindDN</label>
                <div className="col-md-5">
                  <input onChange={onChange} className="form-control" id="ldap_bindn" placeholder="cn=read-only-admin,dc=example,dc=com" name="binddn" defaultValue={res?.ldap_config?.binddn} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ldap_password" className="col-md-3 control-label">Bind Credentials</label>
                <div className="col-md-5">
                  <input onChange={onChange} className="form-control" id="ldap_password" placeholder="" name="bindcredentials" defaultValue={res?.ldap_config?.bindcredentials} type="password" aria-describedby="ldap_password_help" />
                </div>
                <span id="ldap_password_help" className="help-block">Password used for dealing with LDAP queries</span>
              </div>

              <div className="form-group">
                <label htmlFor="ldap_search_base" className="col-md-3 control-label">Search Base</label>
                <div className="col-md-5">
                  <input onChange={onChange} className="form-control" id="ldap_search_base" placeholder="dc=example,dc=com" name="searchbase" defaultValue={res?.ldap_config?.searchbase} />
                </div>
              </div>

              <hr/>

              <p className="col-md-offset-2">In order to prevent a situation where a company account locks itself out, the current administrator
                (<strong>
                  {res?.loggedUser?.name} {res?.loggedUser?.lastname}
                </strong>)
                has to enter the password associated with her/his email on the LDAP server.</p>
              <p className="col-md-offset-2">This is to ensure that
                <strong>
                  {res?.loggedUser?.name} {res?.loggedUser?.lastname}
                </strong> can login into Rocco's Collision PTO with new LDAP settings.</p>

              <hr/>

              <div className="form-group">
                <label htmlFor="current_user_password" className="col-md-3 control-label">My LDAP password</label>
                <div className="col-md-5">
                  <input onChange={onChange} className="form-control" id="current_user_password" placeholder="" name="password_to_check" type="password" aria-describedby="current_user_password_help" />
                </div>
                <span id="current_user_password_help" className="help-block">Password for 
                <strong>
                  {res?.loggedUser?.name} {res?.loggedUser?.lastname}
                </strong> in the new LDAP server.</span>
              </div>

              <div className="form-group">
                <div className="col-md-offset-3 col-md-5">
                  <ActionButton
                    nativeProps={{
                      type: 'button',
                      className: 'pull-right btn btn-success single-click',
                      onClick: saveLdap,
                    }}
                    text="Save LDAP configuration"
                    isLoading={savingLdap}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Page>
  )
};

export default CompanyAuthentication;
