import React, { FC } from "react";

interface DeleteUserConfirmationToastProps {
  message: string;
  confirmMessage: string;
  onDismiss: () => void;
  onConfirm: () => void;
}
const ConfirmationToast: FC<DeleteUserConfirmationToastProps> = ({
  onDismiss,
  onConfirm,
  message,
  confirmMessage,
}) => (
  <div className="confirmation-toast">
    <p className="text-center"><b>{message}</b></p>
    <div className="text-center">
      <button className="btn btn-default" onClick={onDismiss}>Cancel</button>
      {' '}
      <button className="btn btn-danger" onClick={onConfirm}>{confirmMessage}</button>
    </div>
  </div>
);

export default ConfirmationToast;
