import React, { FC } from 'react';
import { UpdateFlashT } from '../../../hooks/useFlash';
import ActionButton from '../button/ActionButton';
import AddLeaveType from '../modals/AddLeaveType';
import ColorPicker from './ColorPicker';
import useLeaveTypes from './hooks/useLeaveTypes';

interface LeaveTypesI {
  updateFlash: UpdateFlashT,
  leaveTypes: Record<string, any>[],
}
const LeaveTypes: FC<LeaveTypesI> = ({ updateFlash, leaveTypes }) => {
  const {
    deletingLeaveType,
    selectedLeaveType,
    deleteLeaveType,
    toggleModal,
    updateLeaveTypes,
    isLoading,
    inputs,
    onSelectLeaveTypeColor,
  } = useLeaveTypes(updateFlash, leaveTypes);

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        Leave Types
      </div>
      <div className="panel-body">
        <div className="row">
          <div className="col-md-6">
            <label className="control-label">Leave Type Name</label>
            <p><em>Tick one to always be on top of the list</em></p>
          </div>
          <div className="col-md-offset-3 col-md-2">
            <label className="control-label">Limit</label>
            <p><em>Days/year</em></p>
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <form id="delete_leavetype_form" method="post" action="/settings/leavetypes/delete/" />
        <form id="leave_type_edit_form" method="post" action="/settings/leavetypes/">

        {!leaveTypes?.length ? (
          <div className="row">
            <div className="col-md-4">No Leave type records</div>
          </div>
        ): (
            leaveTypes?.map((type: any, i: number) => (
            <>
              <div className="row">
                <div className="col-md-6">

                  <div className="input-group">
                    <span className="input-group-addon">
                      <input
                        type="radio"
                        name="first_record"
                        defaultValue={type?.id}
                        defaultChecked={!!type?.sort_order}
                      />
                    </span>
                    <input type="text" className="form-control" name={`name__${type?.id}`} defaultValue={type?.name} data-tom-leave-type-order={`name_${i}`} />

                    <div className="input-group-btn" data-tom-color-picker="1" data-tom-leave-type-order={`colour__${i}`}>
                      <button type="button" className={`btn btn-default dropdown-toggle ${inputs?.[`color__${type?.id}`] || type?.color}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-paint-brush" />
                      </button>
                      <ul className="dropdown-menu">
                        <ColorPicker onSelect={(color: string) => onSelectLeaveTypeColor(color, `color__${type?.id}`)} />
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <input
                    name={`use_allowance__${type?.id}`}
                    id={`use_allowance__${type?.id}`}
                    type="checkbox"
                    defaultChecked={type?.use_allowance}
                    data-tom-leave-type-order={`allowance_${i}`}
                  />
                  {' '}
                  <label htmlFor={`use_allowance__${type?.id}`} className="control-label">Use allowance</label>
                </div>
                <div className="col-md-2">
                  <input type="number" className="form-control" defaultValue={type?.limit} name={`limit__${type.id}`} data-tom-leave-type-order={`limit_${i}`} />
                </div>
                <div className="col-md-1">
                  <ActionButton
                    nativeProps={{
                      className: 'btn btn-default pull-right leavetype-remove-btn',
                      onClick: () => deleteLeaveType(type?.id),
                      type: 'button',
                    }}
                    isLoading={deletingLeaveType && type?.id === selectedLeaveType}
                  >
                    {!(deletingLeaveType && type?.id === selectedLeaveType) ? <span className="fa fa-remove"></span> : null}
                  </ActionButton>
                </div>
              </div>

              <div className="row">&nbsp;</div>
            </>
          ))
        )}

        <div className="row">&nbsp;</div>

        <div className="row">
          <div className="col-md-12">
            <div className="pull-right">
              <button className="btn btn-default" onClick={toggleModal} type="button" id="add_new_leave_type_btn">Add new</button>
              {' '}
              <ActionButton
                nativeProps={{
                  type: 'button',
                  className: 'btn btn-success single-click',
                  onClick: updateLeaveTypes,
                }}
                isLoading={isLoading}
                text="Save changes"
              />
            </div>
          </div>
        </div>
        </form>
      </div>
      <AddLeaveType toggleModal={toggleModal} />
    </div>
  );
};

export default LeaveTypes;
