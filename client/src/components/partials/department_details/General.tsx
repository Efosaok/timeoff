import React, { FC } from "react";
import { Link } from "react-router-dom";
import { UpdateFlashT } from "../../../hooks/useFlash";
import ActionButton from "../button/ActionButton";
import SupervisorsModal from "../modals/SupervisorsModal";
import useDepartmentDetailsForm from "./useDepartmentDetailsForm";

interface AllowanceI {
  value: number;
  caption: number | string;
}
interface DptGeneralProps {
  department: Record<string, any>,
  users: Record<string, string>[],
  allowanceOptions: AllowanceI[],
  updateFlash: UpdateFlashT;
}

const General: FC<DptGeneralProps> = ({ department, allowanceOptions, updateFlash, users }) => {
  const {
    onChange,
    saveDepartmentDetails,
    isLoading,
    removeSupervisor,
    removingSupervisor,
    toggleModal,
    addSupervisors,
  } = useDepartmentDetailsForm({ department, updateFlash });

  return (
    <div className="general-departments">
      <div>
        <div className="col-md-7">

          <ol className="breadcrumb">
            <li><Link to="/departments/" data-vpp-all-departments-link="1">All departments</Link></li>
            <li className="active">
              {department?.name}
            </li>
          </ol>

          <div className="form-group">
            <label htmlFor="name" className="control-label">Name</label>
            <input onChange={onChange} className="form-control" id="name" name="name" required defaultValue={department?.name} />
          </div>

          <div className="form-group">
            <label htmlFor="manager_id" className="control-label">Manager</label>
            <select onChange={onChange} className="form-control" name="boss_id" id="manager_id">
              {users?.map((user: any) => (
                <option value={user?.id}
                  selected={user?.id === department?.bossId}
                >
                  {user?.name} {user?.lastname}
                </option>
              ))}
            </select>
            <span className="help-block">
              Head of {department?.name} department. Main manager.
              <Link to={`/user/${department?.bossId}/`}> More details <i className="fa fa-angle-double-right" /></Link>
            </span>
          </div>

          <div className="form-group">
            <label className="control-label">Secondary supervisors (BETA)</label>
            <ul className="list-group no-bottom-space">
              {department?.supervisors?.map((sup: any) => (
                <li className="list-group-item">
                  <span />
                    <Link to={`/user/${sup?.id}/`}>
                      {sup?.name} {sup?.lastname}
                    </Link>
                    <ActionButton
                      nativeProps={{
                        type: 'button',
                        className: 'pull-right btn btn-link btn-xs',
                        onClick: () => removeSupervisor(sup?.id),
                      }}
                      isLoading={removingSupervisor(sup?.id)}
                      noLoader
                    >
                      <i className="fa fa-trash" />&nbsp;Remove
                    </ActionButton>
                  <span />
                </li>
              ))}

              <li className="list-group-item">
                <span />&nbsp;
                <Link className="pull-right btn btn-link btn-xs"
                  data-vpp-add-new-secondary-supervisor="1"
                  data-department_id={department?.id}
                  data-department_name={department?.name}
                  onClick={toggleModal}
                  to="#"
                >
                  <i className="fa fa-plus" /> Add new secondary supervisor
                </Link>
                <span />
              </li>
            </ul>
            <span className="help-block">
              List of users who also could decide on leave requests from {department?.name} department's employees.
            </span>
          </div>


          <div className="form-group">
            <label htmlFor="allowance_select">Allowance</label>

            <select onChange={onChange} className="form-control" name="allowance" id="allowance_select">
              {allowanceOptions?.map((allowance) => (
                <option value={allowance?.value}
                  selected={department?.allowance === allowance?.value}
                >
                  {allowance?.caption}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="use_bank_holidays_inp" className="control-label">
              <input onChange={onChange} className="" id="use_bank_holidays_inp" name="include_public_holidays" type="checkbox"
              defaultChecked={department?.include_public_holidays}
              /> Include public holidays
            </label>
            <span className="help-block">
              Determine if employees from {department?.name} have
              <Link to="/settings"> bank holidays</Link> in addition to their allowance
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="is_accrued_allowance_inp" className="control-label">
              <input onChange={onChange} className="" id="is_accrued_allowance_inp" name="is_accrued_allowance" type="checkbox"
              defaultChecked={department?.is_accrued_allowance}
              /> Accrued allowance
            </label>
            <span className="help-block">If enabled, holiday allowance starts to build up - or accrue - from the first day of employment. It accrues in proportion to the annual entitlement. E.g. an employee in the ninth month of employment would have built up 9/12ths (or three-quarters) of annual entitlement.</span>
          </div>
          </div>

        <div className="row">
          <div className="col-md-12">
            <ActionButton
              nativeProps={{
                type: 'button',
                className: 'btn btn-success pull-right single-click',
                onClick: saveDepartmentDetails,
              }}
              text="Save changes to department"
              isLoading={isLoading}
            />
            <Link className="btn btn-link pull-right" to="/departments/">Cancel</Link>
          </div>
        </div>

        </div>
        <SupervisorsModal
          users={users}
          toggleModal={toggleModal}
          addSupervisors={addSupervisors}
          supervisorIds={department?.supervisors?.map((sup: any) => sup?.id?.toString())}
          loading={isLoading}
        />
    </div>
  );
};

export default General;
