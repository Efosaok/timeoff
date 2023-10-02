import React, { FC } from "react";
import useAddDepartment from "../../../hooks/useAddDepartment";
import { AllowanceOption, User } from "../../../interface/res";
import FlashMessages from "../bits/FlashMessages";
import ActionButton from "../button/ActionButton";
import Modal from "./Modal";

interface AddNewDepartmentProps {
  users: User[];
  allowanceOptions: AllowanceOption[];
}

const AddNewDepartment: FC<AddNewDepartmentProps> = ({
  allowanceOptions, users
}) => {
  const {
    isLoading,
    addDepartment,
    toggleModal,
    onChange,
    inputs,
    error,
    res,
  } = useAddDepartment(users);

  return (
    <Modal title="Add new Department" name="addDepartment">
      <FlashMessages errors={error?.response?.data?.errors} messages={res?.messages} />
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="department_name_new" className="control-label">Name:</label>
          <input onChange={onChange} value={inputs?.name__new} type="text" className="form-control" id="department_name_new" name="name__new" required placeholder="New department name" />
        </div>

        <div className="form-group">
          <label htmlFor="department_allowance_new" className="control-label">Allowance:</label>
          <select onChange={onChange} className="form-control" id="department_allowance_new" name="allowance__new">
            {allowanceOptions?.map(({ value, caption }) => (
              <option
                value={value}
                selected={value === 20}
                key={value}
                >
                  {caption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <input value={inputs?.include_public_holidays__new} onChange={onChange} type="checkbox" id="department_include_public_holiday_new" name="include_public_holidays__new" checked />&nbsp;
          <label htmlFor="department_include_public_holiday_new" className="control-label">Include Public Holidays?</label>
        </div>

        <div className="form-group">
          <input value={inputs?.is_accrued_allowance__new} onChange={onChange} type="checkbox" id="department_is_accrued_allowance_new" name="is_accrued_allowance__new" />&nbsp;
          <label htmlFor="department_is_accrued_allowance_new" className="control-label">Accrued Allowance?</label>
        </div>

        <div className="form-group">
          <label htmlFor="department_superwiser_new" className="control-label">Supervisor</label>
          <select onChange={onChange} className="form-control" id="department_allowance_new" name="boss_id__new">
            {users?.map((user) => (
              <option value={user?.id} key={user?.id}>
                {user?.name} {user?.lastname}
              </option>
            ))}
          </select>
        </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-link" onClick={toggleModal}>Cancel</button>
        <ActionButton
          text="Create"
          isLoading={isLoading}
          nativeProps={{
            type: 'submit',
            className: 'btn btn-success single-click',
            onClick: addDepartment,
          }}
        />
      </div>
    </Modal>
  );
}

export default AddNewDepartment;
