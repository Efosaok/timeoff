import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../partials/bits/Pagination';
import useEmail from './useAudit';

const Emails = () => {
  const { res, userId, inputs, onChange, filter, clearInputs, canReset } = useEmail();

  return (
    <div className='emails'>
      <h1>Emails audit</h1>

      <div className="row">
        <div className="col-md-6 lead">All emails ever been sent by the system</div>
      </div>

      <div className="row">&nbsp;</div>

      <div className='row'>

        <div className="col-md-3">
          <table className="table table-hover all-departments">
            <thead>
              <tr>
                <th>Filter options</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>
                <div>
                  <div className="form-group input-group">
                    <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                    <input type="text" name="start_date" className="form-control" id="start_date" placeholder="Start Date"
                      data-provide="datepicker" data-date-autoclose="1" data-date-week-start="1"
                      value={inputs?.start_date} onChange={onChange}
                    />
                  </div>
                  <div className="form-group input-group">
                    <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                    <input type="text" name="end_date" className="form-control" id="end_date" placeholder="End Date"
                      data-provide="datepicker" data-date-autoclose="1" data-date-week-start="1"
                      value={inputs?.end_date} onChange={onChange}
                    />
                  </div>
                  <div className="form-group">
                    <select className="form-control" id="employee" name="user_id" value={inputs?.user_id} onChange={onChange}>
                      <option value="">Employee to filter by</option>
                      {res?.all_users?.map((user: any) => (
                        <option
                          value={user?.id}
                          selected={userId === user?.id}
                          >
                            {user?.name} {user?.lastname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button onClick={filter} type="submit" className="btn btn-info single-click">Filter</button>
                  {canReset ? (
                    <Link to="/audit/email/" className="btn btn-default" onClick={clearInputs}>Reset</Link>
                  ): null}
                </div>
              </td></tr>
            </tbody>
          </table>
        </div>

        <div className="col-md-9">
          <table className="table table-hover" id="email_list">
            <thead>
              <tr>
                <th>To Employee</th>
                <th>Subject</th>
                <th>Date And Time</th>
              </tr>
            </thead>
            <tbody>
              {res?.audit_emails?.length ? (
                <>
                {res?.audit_emails?.map((email: any) => (
                  <>
                    <tr id="heading_{{ this.id }}" className="vpp-email-audit-entry-header">
                    <td className="user-link-cell">
                      <Link to={`/audit/email/?user_id=${email?.user?.id}`}>
                        {email?.user?.name} {email?.user?.lastname}
                      </Link>
                    </td>
                    <td>
                      <Link className="collapsed" data-toggle="collapse" data-parent="#email_list" to={`#collapse_${email?.id}`}>
                        {email?.subject}
                      </Link>
                    </td>
                    <td>
                      {moment(email?.created_at).format('DD/MM/YY HH:MM:SS')}
                    </td>
                    </tr>
                    <tr id={`collapse_${email?.id}`} className="collapse">
                      <td colSpan={3}>
                        <address>
                          <strong>To Email:</strong>
                          {' '}
                          <Link to="mailto:#">{email?.email}</Link>
                        </address>
                        <pre>
                          {email?.body}
                        </pre>
                      </td>
                    </tr>
                  </>
                ))}
                </>
              ) : (
                <tr>
                  <td colSpan={3}>
                  <div className="text-center">No emails recorded yet</div>
                </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="text-center">
            <Pagination pager={res?.pager} userId={userId} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Emails;
