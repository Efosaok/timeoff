import React, { FC } from "react";
import { UpdateFlashT } from "../../../hooks/useFlash";
import LeaveItem from "./LeaveItem";

export interface UserRequestsProps {
  leaves: any;
  loggedUser: any;
  metaData?: any;
  updateFlash?: UpdateFlashT;
}

const UserRequests: FC<UserRequestsProps> = ({ leaves, metaData, updateFlash }) => {
  
  return (
    <div className="row">
      {!leaves?.length ? (
        <div className="col-md-12 text-muted">
          There are no leave requests yet.
        </div>
      ): (
        <div className="col-md-12">
          <p className="visible-xs-block"><em className="text-muted">Scroll table horizontally</em></p>
          <div className="table-responsive">
          <table className="table table-hover user-requests-table">
            <thead>
              <tr>
                <th>Dates (from <i className="fa fa-long-arrow-right"></i> to)</th>
                <th>Type</th>
                <th>Deducted</th>
                <th>Time duration</th>
                <th>Approved by</th>
                <th></th>
                <th className="col-xs-2">Comment</th>
                <th className="rejecter_comment">Rejection reason</th>
                <th><span className="pull-right">Status</span></th>
              </tr>
            </thead>

            <tbody>
            {leaves?.map((leave: any) => (
              <LeaveItem leave={leave} metaData={metaData} updateFlash={updateFlash} />
            ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserRequests;
