import React from "react";
import { Link } from "react-router-dom";
import useDepartmentDetails from "./hooks/useDepartmentDetails";
import DepartmentGeneralDetails from '../../components/partials/department_details/General';

const Details = () => {
  const { res } = useDepartmentDetails();

  return (
    <div className="department-details">
      <h1>
        {res?.department?.name} details
      </h1>

      <form method="post" action="/settings/departments/delete/{{ department.id }}/">
        <div className="row">
          <div className="col-md-3 lead">
            Department details
          </div>
          <div className="col-md-1 col-md-offset-8">
            <button id="remove_btn" type="submit" className="pull-right btn btn-danger single-click" data-toggle="tooltip" data-placement="top" title="Remove department"><i className="fa fa-trash"></i> Delete</button>
          </div>
        </div>
      </form>

      <div className="row">&nbsp;</div>

      {/* {{> show_flash_messages }} */}

      <div className="col-md-3 list-group">
        <Link to={`/departments/{${res?.department?.id}/`} className="list-group-item selected-item">General details</Link>
        <Link to={`/users/?department=${res?.department?.id}`} className="list-group-item">Employees from department</Link>
      </div>

      {/* {{> department_details/general }} */}
      <DepartmentGeneralDetails department={res?.department} users={res?.company?.users} allowanceOptions={res?.allowance_options} />

      <div className="row">&nbsp;</div>

    </div>
  );
};

export default Details;
