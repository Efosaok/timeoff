import moment from "moment";
import React, { FC } from "react";
import ActionButton from "../../components/partials/button/ActionButton";
import useBlockedViewItem from "./hooks/useBlockedViewItem";

interface BlockedViewItemProps {
  date: string;
  id: number;
  name: string;
  department?: Record<string, any>
}
const BlockedViewItem: FC<BlockedViewItemProps> = ({ date, id, name, department }) => {
  const { isLoading, deleteBlockedView } = useBlockedViewItem(id);

  return (
    <div className="blocked-view-item">
      <div className="row">
        <div className="col-md-4">
          <div className="input-append date">
            <input disabled type="text" className="form-control" defaultValue={moment(date).format('MM/DD/YY')} name={`date__${id}`} data-date-autoclose="1" data-provide="datepicker" data-date-format="mm/dd/yy" data-date-week-start="1" />
            <span className="add-on"><i className="icon-th" /></span>
          </div>
        </div>
        <div className="col-md-4">
          <input disabled type="text" className="form-control" defaultValue={name} name={`name__${id}`} />
        </div>
        <div className="col-md-2">
          <input disabled type="text" className="form-control" defaultValue={department?.name} name={`name__${id}`} />
        </div>
        <div className="col-md-2">
          <ActionButton
            nativeProps={{
              className: 'btn btn-default pull-right bankholiday-remove-btn',
              type: 'button',
              onClick: deleteBlockedView,
            }}
            isLoading={isLoading}
          >
            {!isLoading ? <><span className="fa fa-remove" />&nbsp;Delete</> : 'Delete'}
          </ActionButton>
        </div>
      </div>

    <div className="row">&nbsp;</div>
    </div>
  )
}

export default BlockedViewItem;
