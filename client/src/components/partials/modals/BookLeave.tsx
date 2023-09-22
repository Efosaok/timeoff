import React from "react";
import ActionButton from "../button/ActionButton";
import Modal from "./Modal";

interface BookLeaveProps {
  loggedUser: any;
}

const BookLeave = () => {
  return (
    <Modal title="New absence">
      <form method="POST" action="{{leave_modal_form_action}}">
        <div className="modal-body">
          {/* {{# if_equal logged_user.supervised_users.length 1 }}{{else}} */}
            <div className="form-group">
              <label htmlFor="employee" className="control-label">For employee:</label>
              <select className="form-control" id="employee" name="user">
                {/* {{#each logged_user.supervised_users}} */}
                <option
                  value="{{@index}}"
                  // {{# if_equal this.id ../logged_user.id }}selected="selected"{{/if_equal}}
                >
                  {/* {{this.full_name}} */}
                </option>
                {/* {{/each}} */}
              </select>
            </div>
          {/* {{/if_equal}} */}


            {/* {{# if_equal logged_user.supervised_users.length 1 }} */}
              <div className="form-group">
                <label htmlFor="leave_type" className="control-label">Leave type:</label>
                <select className="form-control" id="leave_type" name="leave_type">
                <option value={1} data-tom="PAID" data-tom-index={0}>PAID</option>
                </select>
              </div>
              {/* {{else}} */}
              <div className="form-group">
                <label htmlFor="leave_type" className="control-label">Leave type:</label>
                <select className="form-control" id="leave_type" name="leave_type">
                {/* {{#each logged_user.company.leave_types }} */}
                  <option
                    // value={{this.id}}
                    data-tom="{{this.name}}"
                    // data-tom-index={{@index}}
                  >
                    {/* {{this.name}} */}
                  </option>
                {/* {{/each}} */}
                </select>
              </div>
            {/* {{/if_equal}} */}

  <div className="form-group">
            <label htmlFor="comment" className="control-label">Please choose from All Day (100%), Quarter (25%), or Morning/Afternoon (50%).  If choosing quarter, please specify the time you will be out in the reason.</label></div>
            <div className="form-group">
              <label htmlFor="from" className="control-label">From:</label>
              <div className="row">
                <div className="col-md-5">
                  <select className="form-control" name="from_date_part">
                    <option value="1" selected>All day</option>
                    <option value="4">Quarter</option>
                    <option value="2">Morning</option>
                    <option value="3">Afternoon</option>
                  </select>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                    <input type="text" className="form-control book-leave-from-input" id="from" data-provide="datepicker" data-date-autoclose="1" data-date-format="{{# with logged_user.company }}{{this.get_default_date_format_for_date_picker}}{{/with}}" data-date-week-start="1" value="{{as_date booking_start}}" name="from_date" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="to" className="control-label">To:</label>
              <div className="row">
                <div className="col-md-5">
                  <select className="form-control" name="to_date_part">
                    <option value="1" selected>All day</option>
                    <option value="4">Quarter</option>
                    <option value="2">Morning</option>
                    <option value="3">Afternoon</option>
                  </select>
                </div>
                <div className="col-md-7">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                    <input type="text" className="form-control book-leave-to-input" id="to" data-provide="datepicker" data-date-autoclose="1" data-date-format="{{#with logged_user.company }}{{this.get_default_date_format_for_date_picker}}{{/with}}" data-date-week-start="1" value="{{as_date booking_end}}" name="to_date" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="time" className="control-label">Time(in increments)</label>
              <select className="form-control" id="time-increments" name="time">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>1 hr 30 minutes</option>
                <option>2 hours</option>
                <option>2 hours 30 minutes</option>
                <option>3 hours</option>
                <option>3 hours 30 minutes</option>
                <option>4 hours</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="leave_type" className="control-label">Reason (required):</label>
              <textarea className="form-control" id="leave_reason" name="reason"></textarea>
            </div>

    <div className="form-group">
        <label htmlFor="comment" className="control-label">The information in this field is viewable in the PTO calendar.  Please do not provide confidential information.</label></div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
          <ActionButton
            nativeProps={{
            type: "submit",
            className: "btn btn-success single-click",
            onClick: () => {},
            }}
            isLoading
            text='Create'
          />
          {/* {{# if redirect_back_to }} */}
            <input type="hidden" name="redirect_back_to" value="{{redirect_back_to}}" />
          {/* {{else}} */}
            <input type="hidden" name="redirect_back_to" value="{{requested_path}}" />
          {/* {{/if}} */}
        </div>
      </form>
    </Modal>
  );
};

export default BookLeave;
