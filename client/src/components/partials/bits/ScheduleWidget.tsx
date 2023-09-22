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
}

const ScheduleWidget: FC<ScheduleWidgetProps> = ({
  worksMonday,
  worksTuesday,
  worksWednesday,
  worksThursday,
  worksFriday,
  worksSaturday,
  worksSunday,
}) => (
  <div className="schedule-widget">
    <div className="btn-group" data-toggle="buttons">
      <label className={classNames('btn btn-default', { active: worksMonday })} id="schedule_item_monday">
        <input name ="monday" type="checkbox" autoComplete="off"
          checked={worksMonday}
        />Mon</label>
      <label className={classNames('btn btn-default', { active: worksTuesday })} id="schedule_item_tuesday">
        <input name ="tuesday" type="checkbox" autoComplete="off"
          checked={worksTuesday}
        />Tue</label>
      <label className={classNames('btn btn-default', { active: worksWednesday })} id="schedule_item_wednesday">
        <input name ="wednesday" type="checkbox" autoComplete="off"
          checked={worksWednesday}
        />Wed</label>
      <label className={classNames('btn btn-default', { active: worksThursday })} id="schedule_item_thursday"> 
        <input name ="thursday"  type="checkbox" autoComplete="off"
          checked={worksThursday}
        />Thu</label>
      <label className={classNames('btn btn-default', { active: worksFriday })} id="schedule_item_friday">
        <input name ="friday"    type="checkbox" autoComplete="off"
          checked={worksFriday}
        />Fri</label>
      <label className={classNames('btn btn-default', { active: worksSaturday })} id="schedule_item_saturday">
        <input name ="saturday"  type="checkbox" autoComplete="off"
          checked={worksSaturday}
        />Sat</label>
      <label className={classNames('btn btn-default', { active: worksSunday })} id="schedule_item_sunday">
        <input name ="sunday"    type="checkbox" autoComplete="off"
          checked={worksSunday}
        />Sun</label>
    </div>
  </div>
);

export default ScheduleWidget;
