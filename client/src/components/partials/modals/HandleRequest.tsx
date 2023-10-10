import React, { FC } from "react";
import Page from "../bits/Page";
import ActionButton from "../button/ActionButton";
import useHandleRequest from "./hooks/useHandleRequest";
import Modal from "./Modal";

interface HandleRequestProps {
  leave: Record<string, any>,
  toggleModal: (leave: Record<string, any>) => void;
}
const HandleRequest: FC<HandleRequestProps> = ({ leave, toggleModal }) => {
  const {
    isLoading,
    res,
    approveRequest,
    approving,
    rejectRequest,
    rejecting,
    onChange,
    onChangeApproverComment,
    onChangeRejecterComment,
    inputs,
    error,
  } = useHandleRequest(leave, toggleModal);

  return (
    <Modal title="Handle Leave Request" name="handleRequest">
      <Page isLoading={isLoading} error={error}>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="leave_type" className="control-label">Leave type:</label>
            <select onChange={onChange} className="form-control" id="mod_leave_type" name="mod_leave_type">
              {res?.company?.leave_types?.map((leaveType: any, i: number) => (
                <option
                  value={leaveType.id}
                  data-tom={leaveType?.name}
                  data-tom-index={i}
                  key={leaveType?.id}
                  selected={leaveType?.id === leave?.leaveTypeId}
                >
                  {leaveType?.name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="approver_comments" className="control-label">Approval comments:</label>
          <textarea value={inputs?.approver_comment} onChange={onChangeApproverComment} className="form-control" id="approver_comments" name="approver_comment"></textarea>
          <ActionButton
            nativeProps={{
              type: 'button',
              className: 'btn btn-success single-click accept-request',
              onClick: approveRequest,
            }}
            isLoading={approving}
            text="Approve"
          />
          <br />
          <br />
          <div>
            <label htmlFor="rejection_reason" className="control-label">Rejection reason:</label>
            <textarea value={inputs?.rejecter_comment} onChange={onChangeRejecterComment} className="form-control" id="rejecter_reason" name="rejecter_comment"></textarea>
            <ActionButton
              nativeProps={{
                type: 'button',
                className: 'btn btn-warning single-click reject-request',
                onClick: rejectRequest,
              }}
              isLoading={rejecting}
              text="Reject"
            />
            <input type="hidden" value="{{this.id}}" name="request" />
          </div>
          <br />
        </div>
      </Page>
    </Modal>
  );
};

export default HandleRequest;
