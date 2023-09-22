import React from "react";
import ScheduleWidget from "../bits/ScheduleWidget";
import BreadCrumb from "./BreadCrumb";
import useUserSchedule from "./hooks/useUserSchedule";

const Schedule = () => {
  const { res } = useUserSchedule();

  return (
    <div className="schedule">
      <div className="col-md-9">

        <form method="POST" action="/settings/schedule" id="company_schedule_form">
        <input type="hidden" name="user_id" value={res?.employee?.id} />

        {/* {{> user_details/breadcrumb employee=employee }} */}
        <BreadCrumb employee={res?.employee} />

        <div className="form-group">
          <label htmlFor="" className="control-label">Schedule</label>

          <p className="help-block">
            {res?.isUserSpecific ? (
              <>Current employee has <strong data-vpp="declare-user-specific-schedule">custom</strong> schedule.</>
            ): (
            <>Current employee uses <strong><a data-vpp="link-to-company-schedule" href="/settings/general/">company wide</a></strong> schedule.</>
            )}
          </p>

          <div className="input-group">
            <ScheduleWidget {...res?.scheduleMeta} />
          </div>

        </div>
        <div className="form-group">
          <div className="pull-right">
            {res?.isUserSpecific ? (
              <>
                <button type="submit" name="revoke_user_specific_schedule" className="btn btn-default">Move employee to company wide schedule</button>
                <button type="submit" name="save_user_specific_schedule" className="btn btn-success">Save employee specific schedule</button>
              </>
            ): (
              <button type="submit" name="save_user_specific_schedule" className="btn btn-success">Override company wide schedule</button>
            )}
          </div>
        </div>
        </form>

      </div>

    </div>
  )
};

export default Schedule;