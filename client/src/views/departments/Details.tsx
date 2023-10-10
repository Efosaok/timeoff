import React from "react";
import { Link } from "react-router-dom";
import useDepartmentDetails from "./hooks/useDepartmentDetails";
import DepartmentGeneralDetails from '../../components/partials/department_details/General';
import ActionButton from "../../components/partials/button/ActionButton";
import FlashMessages from "../../components/partials/bits/FlashMessages";
import Page from "../../components/partials/bits/Page";

const Details = () => {
  const {
    res,
    deleteDepartment,
    deleting,
    errors,
    messages,
    isLoading,
    detailsError,
    updateFlash,
  } = useDepartmentDetails();

  return (
    <Page isLoading={isLoading} error={detailsError}>
      <div className="department-details">
      <h1>
        {res?.department?.name} details
      </h1>

      <div className="row">
        <div className="col-md-3 lead">
          Department details
        </div>

        <div className="col-md-1 col-md-offset-8">
          <ActionButton
            nativeProps={{
              className: 'pull-right btn btn-danger single-click',
              type: 'button',
              onClick: deleteDepartment,
              'data-toggle': 'tooltip',
              'data-placement': 'top',
              title: 'Remove department',
            }}
            isLoading={deleting}
          >
            {!deleting ? <><i className="fa fa-trash" />&nbsp;</> : null} Delete
          </ActionButton>
        </div>
      </div>

      <FlashMessages errors={errors} messages={messages}  />

      <div className="row">&nbsp;</div>
      <div className="col-md-3 list-group">
        <Link to={`/departments/{${res?.department?.id}/`} className="list-group-item selected-item">General details</Link>
        <Link to={`/users/?department=${res?.department?.id}`} className="list-group-item">Employees from department</Link>
      </div>

      <DepartmentGeneralDetails
        department={res?.department}
        users={res?.company?.users}
        allowanceOptions={res?.allowance_options}
        updateFlash={updateFlash}
      />

      <div className="row">&nbsp;</div>

    </div>
    </Page>
  );
};

export default Details;
