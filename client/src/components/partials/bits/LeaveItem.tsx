import React, { FC } from "react";
import { UpdateFlashT } from "../../../hooks/useFlash";
import { isApproved, isNew, isPendedRevokeLeave, isRejected } from "../../../utils/helpers";
import ActionButton from "../button/ActionButton";
import useRequestItem from "./hooks/useRequestItem";
import LeaveDates from "./LeaveDates";

interface LeaveItemProps {
  metaData: Record<string, any>,
  leave: any;
  updateFlash?: UpdateFlashT;
}
const LeaveItem: FC<LeaveItemProps> = ({
  metaData,
  leave,
  updateFlash = () => {},
}) => {
  const {
    revokeLeaveRequest,
    cancelLeaveRequest,
    cancelling,
    revoking,
  } = useRequestItem(leave?.id, updateFlash);

  return (
    <tr className="leave-request-row">
      <td data-tom-leave-dates="1">
        <LeaveDates leave={metaData?.[leave?.id]} />
      </td>
      <td>
        {leave.leave_type.name}
        {isPendedRevokeLeave(leave?.status) && <><br />(pended revoke)</>}
      </td>
      <td>{metaData?.[leave?.id]?.deductedDays}</td>
      <td>{leave?.time}</td>
      <td className="user-request-table-approver">
        {leave?.approver?.name} {leave?.approver?.lastname}
      </td>
      <td>
        {isApproved(leave?.status) && !isPendedRevokeLeave(leave?.status) ? (
          <ActionButton
            nativeProps={{
              type: 'button',
              className: 'pull-right btn btn-default btn-xs revoke-btn single-click',
              onClick: revokeLeaveRequest,
              title: 'Revoke leave request. Subject of approval.',
            }}
            isLoading={revoking}
            noLoader
          >
            <i className="fa fa-trash" />&nbsp; Revoke
          </ActionButton>
        ): (
          <ActionButton
            nativeProps={{
              type: 'button',
              className: 'pull-right btn btn-default btn-xs revoke-btn single-click',
              onClick: cancelLeaveRequest,
              title: 'Cancel leave request'
            }}
            isLoading={cancelling}
            noLoader
          >
            <i className="fa fa-trash" />&nbsp; Cancel
          </ActionButton>
        )}
      </td>
      <td>{leave?.employee_comment}</td>
      <td>{leave.rejecter_comment}</td>
      <td><span className="pull-right leave-request-row-status">
        {isNew(leave?.status) ? 'Pending' : null}
        {isApproved(leave?.status) ? 'Approved' : null}
        {isRejected(leave?.status) ? 'Rejected': null}
      </span></td>
    </tr>
  )
};

export default LeaveItem;
