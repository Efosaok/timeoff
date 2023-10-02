import React, { FC } from "react";
import ColorPicker from "../bits/ColorPicker";
import FlashMessages from "../bits/FlashMessages";
import ActionButton from "../button/ActionButton";
import useAddLeaveType from "./hooks/useAddLeaveType";
import Modal from "./Modal";

interface AddLeaveTypeProps {
  toggleModal: () => void;
}
const AddLeaveType: FC<AddLeaveTypeProps> = ({ toggleModal }) => {
  const {
    onChange,
    addLeaveType,
    isLoading,
    messages,
    errors,
    inputs,
  } = useAddLeaveType();

  return (
    <Modal title="Add new Leave Type" name="addLeaveType">
      <FlashMessages messages={messages} errors={errors} />
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="leave_type_name_new" className="control-label">Name:</label>
          <input value={inputs?.name__new} onChange={onChange} type="text" className="form-control" id="leave_type_name_new" name="name__new" required />
        </div>

        <div className="form-group">
          <input checked={!!inputs?.use_allowance__new} onChange={onChange} type="checkbox" id="leave_type_use_allovance_new" name="use_allowance__new" />&nbsp;
          <label htmlFor="leave_type_use_allovance_new" className="control-label">Use allowance</label>
          <p><em>If checked leaves of this type are going to be counted towards employee's annual holiday allowance.</em></p>
        </div>

        <div className="form-group">
          <div className="dropdown" data-tom-color-picker="1">
            <input value={inputs?.color__new} onChange={onChange} type="hidden" name="color__new" />
            <button type="button" className="btn btn-default dropdown-toggle leave_type_color_1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-paint-brush"></i> Pick up color for new type</button>
            <ul className="dropdown-menu">
              <ColorPicker />
            </ul>
          </div>
          <p><em>Determine how leaves of new type are going to be highlighted on Calendar/Team view pages.</em></p>
        </div>

        <div className="form-group">
          <label htmlFor="leave_type_limit_new" className="control-label">Limit:</label>
          <input value={inputs?.limit__new} onChange={onChange} type="number" className="form-control" id="leave_type_limit_new" name="limit__new" />
          <p><em>If set to non-zero value determines maximum number of days of new leave type each employee could take during the year.</em></p>
        </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-link" onClick={toggleModal}>Cancel</button>
        {' '}
        <ActionButton
          nativeProps={{
            type: 'button',
            className: 'btn btn-success single-click',
            onClick: addLeaveType,
          }}
          text="Create"
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
};

export default AddLeaveType;
