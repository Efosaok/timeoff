import React from "react";

const RemoveCompanyModal = () => {
  return (
    <div className="modal fade" id="{{container_id}}" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
        <form method="POST" action="/settings//company/delete/" id="remove_company_form">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Remove company account</h4>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="remove_company_name_confirmation" className="control-label">Company name:</label>
              <input type="text" className="form-control" id="remove_company_name_confirmation" name="confirm_name" required />
              <p><em>Please type in the name of the company you wish to remove.</em></p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
            {/* <button type="submit" className="btn btn-danger single-click">Delete company account</button> */}
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default RemoveCompanyModal;
