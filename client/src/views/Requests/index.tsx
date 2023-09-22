import React from "react";
import Page from "../../components/partials/bits/Page";
import UserRequestsGrouped from "../../components/partials/bits/UserRequestsGrouped";
import { isPendedRevokeLeave } from "../../utils/helpers";
import useRequests from "./useRequests";
import UserLeaveSummary from "./UserleaveSummary";

const Requests = () => {
  const { requestsData, isLoading } = useRequests();

  return (
    <Page isLoading={isLoading} error="">
      <div className="requests">
        <h1>
          {requestsData?.data?.loggedUser?.name} {requestsData?.data?.loggedUser?.lastname} messages
        </h1>

        {/* {{> show_flash_messages }} */}

        <div className="row main-row_header">
          <p className="col-md-12">Leave request to approve</p>
        </div>

        <div className="row">
          {/* {{# unless to_be_approved_leaves}} */}
          {!requestsData?.data?.to_be_approved_leaves ? (
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
                    <th>Days</th>
                    <th className="col-xs-2">Comment</th>
                    <th colSpan={2}></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {{#each to_be_approved_leaves }} */}
                  {requestsData?.data?.to_be_approved_leaves?.map((leave: any) => (
                    <tr key={leave?.id}>
                      <td>
                        {leave?.user?.name} {leave?.user?.lastname}
                      </td>
                      <td className="date_of_request">
                        {leave?.createdAt.slice(0, 10)}
                        </td>
                      <td data-tom-leave-dates="1">
                        <div>
                          <strong>Dates:</strong>
                          {' '}
                          {requestsData?.data?.groupedLeavesMeta?.[leave?.id]?.startLeaveDay?.date}
                          {' '}
                          <i className="fa fa-long-arrow-right"></i>
                          {' '}
                          {requestsData?.data?.groupedLeavesMeta?.[leave?.id]?.endLeaveDay?.date}
                        </div>
                        <UserLeaveSummary userId={leave?.user?.id} />
                      </td>
                      <td>
                        {isPendedRevokeLeave(leave?.status) ? 'REVOKE' : null} {leave?.leave_type?.name}
                      </td>
                      <td data-vpp="days_used">
                        {requestsData?.data?.groupedLeavesMeta?.[leave?.id]?.deductedDays}
                      </td>
                      <td>
                        {leave?.employee_comment}
                      </td>
                      <td>
                        <form action="/requests/reject/" method="POST">
                          <input className="btn btn-warning single-click" type="submit" value="Reject" />
                          <input type="hidden" value="{{this.id}}" name="request" />
                        </form>
                      </td>
                      
                      <td>
                        <form action="/requests/approve/" method="POST">
                          <input className="btn btn-success single-click" type="submit" value="Approve" />
                          <input type="hidden" value="{{this.id}}" name="request" />
                        </form>
                      </td>
                      {/* <td>
                        <div className="form-group">
                          <button type="button" className="btn btn-info" data-toggle="modal" data-target="#handle_request_modal"
                            id="book_time_off_btn">Handle Request</button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                  {/* {{/each}} */}
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
          groups={requestsData?.data?.my_leaves_grouped}
          metaData={requestsData?.data?.groupedLeavesMeta}
          loggedUser={requestsData?.data?.loggedUser}
        />

      </div>
    </Page>
  );
};

export default Requests;
