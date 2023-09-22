import React from "react";
import UserRequests from "./UserRequests";

const UserRequestsGrouped = ({ groups, loggedUser, metaData }: any) => (
  <div className="user-requests-grouped">
    {groups?.map((group: any) => (
      <>
        <h2>{group?.year}</h2>
        <UserRequests leaves={group?.leaves} loggedUser={loggedUser} metaData={metaData} />
        <p><em>Days would be deducted from allowance:</em> <span>{ group?.total_deduction }</span></p>
        <div className="main-row_header">&nbsp;</div>
      </>
    ))}
  </div>
);

export default UserRequestsGrouped;
