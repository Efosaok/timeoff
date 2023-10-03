import React from "react";
import FlashMessages from "../../components/partials/bits/FlashMessages";
import Page from "../../components/partials/bits/Page";
import UserRequestsGrouped from "../../components/partials/bits/UserRequestsGrouped";
import HandleRequest from "../../components/partials/modals/HandleRequest";
import { isPendedRevokeLeave } from "../../utils/helpers";
import useRequests from "./useRequests";
import UserLeaveSummary from "./UserleaveSummary";

const Requests = () => {
  const {
    res,
    isLoading,
    toggleModal,
    selectedLeave,
    error,
    messages,
    errors,
    updateFlash,
  } = useRequests();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="requests">
        <h1>
          {res?.loggedUser?.name} {res?.loggedUser?.lastname} messages
        </h1>

        {/* {{> show_flash_messages }} */}
        <FlashMessages messages={messages} errors={errors} />

        <div className="row main-row_header">
          <p className="col-md-12">Leave request to approve</p>
        </div>

        <div className="row">
          {!res?.to_be_approved_leaves ? (
            <div className="col-md-12 text-muted">
              There are no leave requests to decide on.
            </div>
          ): (
            <div className="col-md-12">
              <p className="visible-xs-block"><em className="text-muted">Scroll table horizontally</em></p>
              <div className="table-responsive">
              <table className="table table-hover requests-to-approve-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Date of request</th>
                    <th>Leave summary</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Days</th>
                    <th className="col-xs-2">Comment</th>
                    <th colSpan={2}></th>
                  </tr>
                </thead>
                <tbody>
                  {res?.to_be_approved_leaves?.map((leave: any) => (
                    <tr key={leave?.id}>
                      <td>
                        <div className="employee_colum">{`${leave?.user?.name} ${leave?.user?.lastname}`}</div>
                      </td>
                      <td className="date_of_request">
                        {leave?.createdAt.slice(0, 10)}
                      </td>
                      <td data-tom-leave-dates="1">
                        <div>
                          <strong>Dates:</strong>
                          {' '}
                          {res?.groupedLeavesMeta?.[leave?.id]?.startLeaveDay?.date}
                          {' '}
                          <i className="fa fa-long-arrow-right"></i>
                          {' '}
                          {res?.groupedLeavesMeta?.[leave?.id]?.endLeaveDay?.date}
                        </div>
                        <UserLeaveSummary userId={leave?.user?.id} />
                      </td>
                      <td>
                        {isPendedRevokeLeave(leave?.status) ? 'REVOKE' : null} {leave?.leave_type?.name}
                      </td>
                      <td>
                        {leave?.time}
                      </td>
                      <td data-vpp="days_used">
                        {res?.groupedLeavesMeta?.[leave?.id]?.deductedDays}
                      </td>
                      <td>
                        {leave?.employee_comment}
                      </td>
                      <td>
                        <div className="form-group">
                          <button onClick={() => toggleModal(leave)} type="button" className="btn btn-info" id="book_time_off_btn">Handle Request</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>


        <div className="main-row_header">&nbsp;</div>

        <div className="row main-row_header">
          <p className="col-md-12">All my absences</p>
        </div>

        <UserRequestsGrouped
          groups={res?.my_leaves_grouped}
          metaData={res?.groupedLeavesMeta}
          loggedUser={res?.loggedUser}
          updateFlash={updateFlash}
        />

      </div>
      <HandleRequest leave={selectedLeave} toggleModal={toggleModal} />
    </Page>
  );
};

export default Requests;
