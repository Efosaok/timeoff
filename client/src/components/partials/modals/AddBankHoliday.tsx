import React from "react";

const AddBankHoliday = () => {
  return (
    <div className="modal fade" id="{{container_id}}" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
        <form method="POST" action="{{form_action}}?year={{yearCurrent}}" id="add_new_bank_holiday_form">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Add new Bank Holiday</h4>
          </div>

          {/* {{#each company.bank_holidays}} */}
            <input type="hidden" value="{{name}}" name="name__{{@index}}" />
            <input type="hidden" value="{{as_date date}}" name="date__{{@index}}" />
          {/* {{/each}} */}

          <div className="modal-body">

            <div className="form-group">
              <label htmlFor="bank_holiday_name_new" className="control-label">Name:</label>
              <input type="text" className="form-control" id="bank_holiday_name_new" name="name__new" required />
            </div>

            <div className="form-group">
              <label htmlFor="bank_holiday_date_new" className="control-label">Date:</label>
              <input
                type="text"
                className="form-control"
                id="bank_holiday_date_new"
                name="date__new"
                value="{{as_date startDateOfYearCurrent}}"
                required
                data-provide="datepicker"
                data-date-autoclose="1"
                data-date-format="{{#with logged_user.company }}{{this.get_default_date_format_for_date_picker}}{{/with}}"
                data-date-week-start="1"
              />
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-success single-click">Create</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default AddBankHoliday;
