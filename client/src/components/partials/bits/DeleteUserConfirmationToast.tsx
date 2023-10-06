import React, { FC } from "react";

interface DeleteUserConfirmationToastProps {
  name: string;
  lastname: string;
}
const DeleteUserConfirmationToast: FC<DeleteUserConfirmationToastProps> = ({ name, lastname }) => (
  <div>
    <p>Do you really want to delete the user {name} {lastname}</p>
  </div>
);

export default DeleteUserConfirmationToast;
