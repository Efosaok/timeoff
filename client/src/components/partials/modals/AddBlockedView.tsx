import React, { FC } from "react"
import FlashMessages from "../bits/FlashMessages";
import Page from "../bits/Page";
import ActionButton from "../button/ActionButton";
import useAddBlockedView from "./hooks/useAddBlockedView";
import Modal from "./Modal";

interface AddBlockedViewProps {
  toggleModal: () => void;
}
const AddBlockedView: FC<AddBlockedViewProps> = ({ toggleModal }) => {
  const {
    messages,
    errors,
    onChange,
    inputs,
    addBlockedView,
    isLoading,
    fetchingDpts,
    fetchingDptsErr,
    departments,
    showFlash,
  } = useAddBlockedView();

  return (
    <Modal title="Add blocked view" name="addBlockedView">
      <Page isLoading={fetchingDpts} error={fetchingDptsErr}>
        <div className="add-blocked-view">
          <FlashMessages show={showFlash} messages={messages} errors={errors} />
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="blocked_view_name_new" className="control-label">Name:</label>
              <input onChange={onChange} value={inputs?.name} type="text" className="form-control" id="blocked_view_name_new" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="bank_holiday_date_new" className="control-label">Date:</label>
              <input
                type="date"
                className="form-control"
                id="blocked_view_date_new"
                name="date"
                onChange={onChange}
                value={inputs?.date}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="blocked_view_department" className="control-label">Department:</label>
              <select onChange={onChange} className="blocked_view_dpt form-control" name="departmentId">
                <option value="">Select Department</option>
                {departments?.map((dpt: any) => (
                  <option value={dpt?.id}>{dpt?.name}</option>
                ))}
              </select>
            </div>

          </div>
          <div className="modal-footer">
            <button onClick={toggleModal} type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
            <ActionButton
              nativeProps={{
                type: 'button',
                className: 'btn btn-success single-click',
                onClick: addBlockedView,
              }}
              isLoading={isLoading}
              text="Create"
            />
          </div>
        </div>
      </Page>
    </Modal>
  )
};

export default AddBlockedView;
