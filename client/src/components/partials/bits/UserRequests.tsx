import React, { FC } from "react";
import { Link } from "react-router-dom";
import { isApproved, isNew, isPendedRevokeLeave, isRejected } from "../../../utils/helpers";
import LeaveDates from "./LeaveDates";

interface UserRequestsProps {
  leaves: any;
  loggedUser: any;
  metaData?: any;
}

const UserRequests: FC<UserRequestsProps> = ({ leaves, loggedUser, metaData }) => {
  
  return (
    <div className="row">
      {!leaves?.length ? (
        <div className="col-md-12 text-muted">
          There are no leave requests yet.
        </div>
      ): null}

      <div className="col-md-12">
        <p className="visible-xs-block"><em className="text-muted">Scroll table horizontally</em></p>
        <div className="table-responsive">
        <table className="table table-hover user-requests-table">
          <thead>
            <tr>
              <th>Dates (from <i className="fa fa-long-arrow-right"></i> to)</th>
              <th>Type</th>
              <th>Deducted</th>
              <th>Approved by</th>
              <th></th>
              <th className="col-xs-2">Comment</th>
              <th><span className="pull-right">Status</span></th>
            </tr>
          </thead>

          <tbody>
          {leaves?.map((leave: any) => (
            <tr className="leave-request-row">
              <td data-tom-leave-dates="1">
                <LeaveDates leave={metaData?.[leave?.id]} />
              </td>
              <td>
                {leave.leave_type.name}
                {isPendedRevokeLeave(leave?.status) && <><br />(pended revoke)</>}
              </td>
              <td>{metaData?.[leave?.id]?.deductedDays}</td>
              <td className="user-request-table-approver">
                {leave?.approver?.name} {leave?.approver?.lastname}
              </td>
              <td>
                {isApproved(leave?.status) && !isPendedRevokeLeave(leave?.status) ? (
                  <form method="post" action="/requests/revoke/">
                    <input type="hidden" value={leave?.id} name="request" />
                    <button type="submit" className="pull-right btn btn-default btn-xs revoke-btn single-click" title="Revoke leave request. Subject of approval."><i className="fa fa-trash"></i> Revoke</button>
                  </form>
                ): (<form method="post" action='/requests/cancel/'>
                    <input type="hidden" value={leave?.id} name="request" />
                    <button type="submit" className="pull-right btn btn-default btn-xs revoke-btn single-click" title="Cancel leave request" value="cancel"><i className="fa fa-trash"></i> Cancel</button>
                  </form>
                )}
              </td>
              <td>{leave?.employee_comment}</td>
              <td><span className="pull-right leave-request-row-status">
                {isNew(leave?.status) ? 'Pending' : null}
                {isApproved(leave?.status) ? 'Approved' : null}
                {isRejected(leave?.status) ? 'Rejected': null}
              </span></td>
            </tr>
          ))}

          </tbody>
        </table>
        </div>
      </div>
      {/* // {{/unless}} */}
    </div>
  )
}

export default UserRequests;
