import React, { FC } from "react";
import UserRequests, { UserRequestsProps } from "./UserRequests";

interface UserRequestsGroupedProps extends Omit<UserRequestsProps, 'leaves'> {
  groups: Record<string, any>;
}
const UserRequestsGrouped: FC<UserRequestsGroupedProps> = ({ groups, loggedUser, metaData, updateFlash }) => (
  <div className="user-requests-grouped">
    {groups?.map((group: any) => (
      <>
        <h2>{group?.year}</h2>
        <UserRequests
          leaves={group?.leaves}
          loggedUser={loggedUser}
          metaData={metaData}
          updateFlash={updateFlash}
        />
        <p><em>Days would be deducted from allowance:</em> <span>{ group?.total_deduction }</span></p>
        <div className="main-row_header">&nbsp;</div>
      </>
    ))}
  </div>
);

export default UserRequestsGrouped;
