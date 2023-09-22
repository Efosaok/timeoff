import React from "react";

const AddNewDepartment = () => {
  return (
    <div className="modal fade" id="{{container_id}}" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
        <form method="POST" action="{{form_action}}" id="add_new_department_form">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Add new Department</h4>
          </div>

          <div className="modal-body">

            <div className="form-group">
              <label htmlFor="department_name_new" className="control-label">Name:</label>
              <input type="text" className="form-control" id="department_name_new" name="name__new" required placeholder="New department name" />
            </div>

            <div className="form-group">
              <label htmlFor="department_allowance_new" className="control-label">Allowance:</label>
              <select className="form-control" id="department_allowance_new" name="allowance__new">
                {/* {{#each allowance_options}} */}
                <option
                  value="{{value}}"
                  // {{#if_equal this.value 20}} selected="selected"{{/if_equal}}
                  >
                    {/* {{caption}} */}
                  </option>
                {/* {{/each}} */}
              </select>
            </div>

            <div className="form-group">
              <input type="checkbox" id="department_include_public_holiday_new" name="include_public_holidays__new" checked />&nbsp;
              <label htmlFor="department_include_public_holiday_new" className="control-label">Include Public Holidays?</label>
            </div>

            <div className="form-group">
              <input type="checkbox" id="department_is_accrued_allowance_new" name="is_accrued_allowance__new" />&nbsp;
              <label htmlFor="department_is_accrued_allowance_new" className="control-label">Accrued Allowance?</label>
            </div>

            <div className="form-group">
              <label htmlFor="department_superwiser_new" className="control-label">Supervisor</label>
              <select className="form-control" id="department_allowance_new" name="boss_id__new">
                {/* {{#each company.users}} */}
                  <option value="{{this.id}}">
                    {/* {{this.full_name}} */}
                  </option>
                {/* {{/each}} */}
              </select>
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

export default AddNewDepartment;
