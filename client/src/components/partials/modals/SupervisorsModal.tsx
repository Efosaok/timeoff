import React, { FC } from "react";
import AvailableSupervisors from "../../department/AvailableSupervisors";
import ActionButton from "../button/ActionButton";
import useSupervisorsSelector from "./hooks/useSupervisorsSelector";
import Modal from "./Modal";

interface SupervisorsModalProps {
  users: Record<string, string>[];
  supervisorIds: string[];
  toggleModal: () => void;
  addSupervisors: (supervisors: string[]) => void;
  loading?: boolean;
}
const SupervisorsModal: FC<SupervisorsModalProps> = ({
  users,
  supervisorIds,
  toggleModal,
  addSupervisors,
  loading
}) => {
  const { onSelect, selectedSupervisors } = useSupervisorsSelector(supervisorIds);

  return (
    <Modal id="add_secondary_supervisers_modal" title="Add Supervisors to department" name="selectSupervisors">
      <div className="modal-body">
        <AvailableSupervisors users={users} supervisorIds={selectedSupervisors} onSelect={onSelect} />
      </div>
      <div className="modal-footer">
        <button type="button" onClick={toggleModal} className="btn btn-link">Cancel</button>
        <ActionButton
          nativeProps={{
            type: 'button',
            className: 'btn btn-success single-click',
            onClick: () => addSupervisors(selectedSupervisors),
          }}
          text="Add selected employees"
          isLoading={loading}
        />
      </div>
    </Modal>
  );
};

export default SupervisorsModal;
