import React, { ChangeEvent, FC } from 'react';
import { Link } from 'react-router-dom';
interface AvailableSupervisorProps {
  users: Record<string, string>[];
  supervisorIds: string[];
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AvailableSupervisors: FC<AvailableSupervisorProps> = ({ users, supervisorIds, onSelect }) => {
  return (
    <div className="list-group">
      {users?.length ? (
        <>
          {users?.map((user: any) => (
            <label className="list-group-item label-plain">
              <input
                type="checkbox"
                name="supervisor_id"
                defaultValue={user?.id}
                checked={supervisorIds.includes(user?.id.toString())}
                onChange={onSelect}
              /> { user?.name } {user?.lastname}
            </label>
          ))}
        </>
      ) : (
        <>
        <p>No employees axvailable to be added as secondary supervisors.</p>
        <p>
          <Link to="/users/add/" data-vpp-add-supervisor-modal-add-new-user="1" />Add new employee <i className="fa fa-angle-double-right" />
        </p>
        </>
      )}
    </div>
  );
};

export default AvailableSupervisors;
