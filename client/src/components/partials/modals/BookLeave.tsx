import moment from "moment";
import React from "react";
import FlashMessages from "../bits/FlashMessages";
import Page from "../bits/Page";
import ActionButton from "../button/ActionButton";
import useBookLeave from "./hooks/useBookLeave";
import Modal from "./Modal";

const BookLeave = () => {
  const {
    res,
    toggleShowModal,
    isLoading,
    error,
    messages,
    errors,
    booking,
    bookLeave,
    onChange,
    disableTimeField,
    showFlash,
  } = useBookLeave();

  return (
    <Modal title="New absence">
      <Page isLoading={isLoading} error={error}>
        <div>
          <FlashMessages show={showFlash} messages={messages} errors={errors} />
          <div className="modal-body">
            {res?.users?.length > 1 ? (
              <div className="form-group">
                <label htmlFor="employee" className="control-label">For employee:</label>
                <select onChange={onChange} className="form-control" id="employee" name="user">
                  {res?.users?.map((user: any, i: number) => (
                    <option
                      key={user?.id}
                      value={user?.id}
                      selected={user?.id === res?.loggedUser?.id}
                    >
                      {user?.name} {user?.lastname}
                    </option>
                  ))}
                </select>
              </div>
            ): null}

              {res?.users?.length <= 1 ? (
                <div className="form-group">
                  <label htmlFor="leave_type" className="control-label">Leave type:</label>
                  <select onChange={onChange} className="form-control" id="leave_type" name="leave_type">
                  <option value={1} data-tom="PAID" data-tom-index={0}>PAID</option>
                  </select>
                </div>
              ): (
                <div className="form-group">
                  <label htmlFor="leave_type" className="control-label">Leave type:</label>
                  <select onChange={onChange} className="form-control" id="leave_type" name="leave_type">
                    {res?.company?.leave_types?.map((leaveType: any, i: number) => (
                      <option
                        value={leaveType?.id}
                        data-tom={leaveType?.name}
                        data-tom-index={i}
                      >
                        {leaveType?.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            <div className="form-group">
              <label htmlFor="comment" className="control-label">Please choose from All Day (100%), Quarter (25%), or Morning/Afternoon (50%).  If choosing quarter, please specify the time you will be out in the reason.</label></div>
              <div className="form-group">
                <label htmlFor="from" className="control-label">From:</label>
                <div className="row">
                  <div className="col-md-5">
                    <select onChange={onChange} className="form-control" name="from_date_part">
                      <option value="1" selected>All day</option>
                      <option value="4">Quarter</option>
                      <option value="2">Morning</option>
                      <option value="3">Afternoon</option>
                    </select>
                  </div>
                  <div className="col-md-7">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                      <input onChange={onChange} type="date" className="form-control book-leave-from-input" id="from" data-date-week-start="1" defaultValue={moment().format("MM/DD/YY")} name="from_date" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="to" className="control-label">To:</label>
                <div className="row">
                  <div className="col-md-5">
                    <select  onChange={onChange} className="form-control" name="to_date_part">
                      <option value="1" selected>All day</option>
                      <option value="4">Quarter</option>
                      <option value="2">Morning</option>
                      <option value="3">Afternoon</option>
                    </select>
                  </div>
                  <div className="col-md-7">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                      <input onChange={onChange} type="date" className="form-control book-leave-to-input" id="to" data-date-autoclose="1" defaultValue={moment().format("MM/DD/YY")} name="to_date" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="time" className="control-label">Time(in increments)</label>
                <select onChange={onChange} className="form-control" id="time-increments" name="time" disabled={disableTimeField}>
                  <option value="">Select duration</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1 hr 30 minutes">1 hr 30 minutes</option>
                  <option value="2 hours">2 hours</option>
                  <option value="2 hours 30 minutes">2 hours 30 minutes</option>
                  <option value="3 hours">3 hours</option>
                  <option value="3 hours 30 minutes">3 hours 30 minutes</option>
                  <option value="4 hours">4 hours</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="leave_type" className="control-label">Reason (required):</label>
                <textarea  onChange={onChange} className="form-control" id="leave_reason" name="reason"></textarea>
              </div>

          <div className="form-group">
            <label htmlFor="comment" className="control-label">The information in this field is viewable in the PTO calendar.  Please do not provide confidential information.</label></div>
            </div>
            <div className="modal-footer">
              <button onClick={() => toggleShowModal()} type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
              <ActionButton
                nativeProps={{
                type: "submit",
                className: "btn btn-success single-click",
                onClick: bookLeave,
                }}
                isLoading={booking}
                text='Create'
              />
            </div>
        </div>
      </Page>
    </Modal>
  );
};

export default BookLeave;
