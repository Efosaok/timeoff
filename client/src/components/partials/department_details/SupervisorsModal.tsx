import React from "react";

const SupervisorsModal = () => (
  <div className="modal fade" id="add_secondary_supervisers_modal" tabIndex={-1} role="dialog" aria-labelledby="add_secondary_supervisers_modal_la">
  <div className="modal-dialog" role="document">
    <form action="/settings/departments/edit/{{ department.id }}/" method="post">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="modal_confirmation_reject_la">Add supervisors to <strong></strong> department</h4>
      </div>
      <div className="modal-body">
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
        <button type="submit" className="btn btn-success single-click" name="do_add_supervisors" value="1">Add selected employees</button>
      </div>
    </div>
    </form>
  </div>
</div>
);

export default SupervisorsModal;
