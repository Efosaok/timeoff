import moment from "moment";
import React, { FC } from "react";
import FlashMessages from "../bits/FlashMessages";
import ActionButton from "../button/ActionButton";
import useAddBankHoliday from "./hooks/useAddBankHoliday";
import Modal from "./Modal";

interface AddBankHolidayProps {
  yearCurrent: string;
  bankHolidays?: Record<string, any>[],
  toggleModal: () => void;
}

const AddBankHoliday: FC<AddBankHolidayProps> = ({ yearCurrent, bankHolidays, toggleModal }) => {
  const {
    inputs,
    onChange,
    isLoading,
    addBankHoliday,
    messages,
    errors,
  } = useAddBankHoliday();

  return (
    <Modal title="Add new Bank Holiday" name="addBankHoliday">
      <FlashMessages messages={messages} errors={errors} />
      <div className="modal-body">
        <div className="form-group">
          <label htmlFor="bank_holiday_name_new" className="control-label">Name:</label>
          <input onChange={onChange} value={inputs?.name__new} type="text" className="form-control" id="bank_holiday_name_new" name="name__new" required />
        </div>

        <div className="form-group">
          <label htmlFor="bank_holiday_date_new" className="control-label">Date:</label>
          <input
            type="date"
            className="form-control"
            id="bank_holiday_date_new"
            name="date__new"
            onChange={onChange}
            required
          />
        </div>

      </div>
      <div className="modal-footer">
        <button onClick={toggleModal} type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
        <ActionButton
          nativeProps={{
            type: 'submit',
            className: 'btn btn-success single-click',
            onClick: addBankHoliday,
          }}
          isLoading={isLoading}
          text="Create"
        />
      </div>
    </Modal>
  );
}

export default AddBankHoliday;
