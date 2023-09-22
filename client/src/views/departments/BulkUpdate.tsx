import React from "react";

const DepartmentsBulkUpdate = () => {
  return (
    <div className="departments">

      <h1>Departments</h1>

      {/* {{> show_flash_messages }} */}

      <div className="row">
        <div className="col-md-4 lead">Departments settings bulk edit</div>
        <div className="col-md-4 col-md-offset-4">
          <button className="btn btn-info pull-right" data-toggle="modal" data-target="#add_new_department_modal" type="button" id="add_new_department_btn">Add new department</button>
          <a href='/settings/departments/'className="btn btn-link pull-right">Overview</a>
        </div>
      </div>

      <div className="row">&nbsp;</div>

      <div className="row">
          <div className="col-md-4"><label className="control-label">Name</label></div>
          <div className="col-md-3"><label className="control-label">Allowance</label></div>
          <div className="col-md-3"><label className="control-label">Manager</label></div>
          <div className="col-md-2"><label className="control-label">Number of Users</label></div>
      </div>

      <div className="row">&nbsp;</div>

      <form id="delete_form" method="post" action="/settings/departments/delete/"></form>

    </div>
  );
};

export default DepartmentsBulkUpdate;
