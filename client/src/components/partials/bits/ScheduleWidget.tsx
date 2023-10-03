import classNames from "classnames";
import React, { FC } from "react";

interface ScheduleWidgetProps {
  worksMonday: boolean;
  worksTuesday: boolean;
  worksWednesday: boolean;
  worksThursday: boolean;
  worksFriday: boolean;
  worksSaturday: boolean;
  worksSunday: boolean;
  onChange: (event: any) => void;
}

const ScheduleWidget: FC<ScheduleWidgetProps> = ({
  worksMonday,
  worksTuesday,
  worksWednesday,
  worksThursday,
  worksFriday,
  worksSaturday,
  worksSunday,
  onChange,
}) => (
  <div className="schedule-widget">
    <div className="btn-group" data-toggle="buttons">
      <label className={classNames('btn btn-default', { active: worksMonday })} id="schedule_item_monday" title="monday" onClick={onChange}>
        <input name ="monday" type="checkbox" autoComplete="off" value="on"
          checked={worksMonday}
        />Mon
      </label>
      <label onClick={onChange} title="tuesday" className={classNames('btn btn-default', { active: worksTuesday })} id="schedule_item_tuesday">
        <input name ="tuesday" type="checkbox" autoComplete="off"
          checked={worksTuesday}
        />Tue
      </label>
      <label onClick={onChange} title="wednesday" className={classNames('btn btn-default', { active: worksWednesday })} id="schedule_item_wednesday">
        <input name ="wednesday" type="checkbox" autoComplete="off"
          checked={worksWednesday}
        />Wed</label>
      <label onClick={onChange} title="thursday" className={classNames('btn btn-default', { active: worksThursday })} id="schedule_item_thursday"> 
        <input name ="thursday" type="checkbox" autoComplete="off"
          checked={worksThursday}
        />Thu</label>
      <label onClick={onChange} title="friday" className={classNames('btn btn-default', { active: worksFriday })} id="schedule_item_friday">
        <input name ="friday" type="checkbox" autoComplete="off"
          checked={worksFriday}
        />Fri</label>
      <label onClick={onChange} title="saturday" className={classNames('btn btn-default', { active: worksSaturday })} id="schedule_item_saturday">
        <input name ="saturday" type="checkbox" autoComplete="off"
          checked={worksSaturday}
        />Sat</label>
      <label onClick={onChange} title="sunday" className={classNames('btn btn-default', { active: worksSunday })} id="schedule_item_sunday">
        <input name ="sunday" type="checkbox" autoComplete="off"
          checked={worksSunday}
        />Sun</label>
    </div>
  </div>
);

export default ScheduleWidget;
