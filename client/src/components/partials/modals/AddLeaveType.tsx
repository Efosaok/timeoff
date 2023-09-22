


<div className="modal fade" id="{{container_id}}" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
    <form id="leave_type_new_form" method="POST" action="{{form_action}}">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title">Add new Leave Type</h4>
      </div>

      <div className="modal-body">

        <div className="form-group">
          <label htmlFor="leave_type_name_new" className="control-label">Name:</label>
          <input type="text" className="form-control" id="leave_type_name_new" name="name__new" required />
        </div>

        <div className="form-group">
          <input type="checkbox" id="leave_type_use_allovance_new" name="use_allowance__new" />&nbsp;
          <label htmlFor="leave_type_use_allovance_new" className="control-label">Use allowance</label>
          <p><em>If checked leaves of this type are going to be counted towards employee's annual holiday allowance.</em></p>
        </div>

        <div className="form-group">
          <div className="dropdown" data-tom-color-picker="1">
            <input type="hidden" name="color__new" value="leave_type_color_1" />
            <button type="button" className="btn btn-default dropdown-toggle leave_type_color_1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-paint-brush"></i> Pick up color for new type</button>
            <ul className="dropdown-menu">
              {/* {{> options_for_color_picker}} */}
            </ul>
          </div>
          <p><em>Determine how leaves of new type are going to be highlighted on Calendar/Team view pages.</em></p>
        </div>



        <div className="form-group">
          <label htmlFor="leave_type_limit_new" className="control-label">Limit:</label>
          <input type="number" className="form-control" id="leave_type_limit_new" name="limit__new" />
          <p><em>If set to non-zero value determines maximum number of days of new leave type each employee could take during the year.</em></p>
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
