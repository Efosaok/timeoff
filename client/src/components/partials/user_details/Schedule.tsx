import React from "react";
import { Link } from "react-router-dom";
import Page from "../bits/Page";
import ScheduleWidget from "../bits/ScheduleWidget";
import ActionButton from "../button/ActionButton";
import BreadCrumb from "./BreadCrumb";
import useUserSchedule from "./hooks/useUserSchedule";

const Schedule = () => {
  const {
    res,
    isLoading,
    error,
    revokeUserSpecificSchedule,
    saveUserSpecificSchedule,
    revokingSchedule,
    savingSchedule,
    isUserSpecific,
    onChangeSchedule,
  } = useUserSchedule();

  return (
    <Page isLoading={isLoading} error={error}>
      <div className="schedule">
        <div className="col-md-9">

          <div>
          <input type="hidden" name="user_id" value={res?.employee?.id} />

          <BreadCrumb employee={res?.employee} />

          <div className="form-group">
            <label htmlFor="" className="control-label">Schedule</label>

            <p className="help-block">
              {isUserSpecific ? (
                <>Current employee has <strong data-vpp="declare-user-specific-schedule">custom</strong> schedule.</>
              ): (
              <>Current employee uses <strong><Link data-vpp="link-to-company-schedule" to="/settings">company wide</Link></strong> schedule.</>
              )}
            </p>

            <div className="input-group">
              <ScheduleWidget {...res?.scheduleMeta} onChange={onChangeSchedule} />
            </div>

          </div>
          <div className="form-group">
            <div className="pull-right">
              {isUserSpecific ? (
                <>
                  <ActionButton
                    nativeProps={{
                      type: 'button',
                      className: 'btn btn-default',
                      onClick: revokeUserSpecificSchedule,
                    }}
                    text="Move employee to company wide schedule"
                    isLoading={revokingSchedule}
                  />
                  {' '}
                  <ActionButton
                    nativeProps={{
                      type: 'button',
                      className: 'btn btn-success',
                      onClick: saveUserSpecificSchedule,
                    }}
                    text="Save employee specific schedule"
                    isLoading={savingSchedule}
                  />
                </>
              ): (
                <ActionButton
                    nativeProps={{
                      type: 'button',
                      className: 'btn btn-success',
                      onClick: saveUserSpecificSchedule,
                    }}
                    text="Override company wide schedule"
                    isLoading={savingSchedule}
                  />
              )}
            </div>
          </div>
          </div>

        </div>

      </div>
    </Page>
  )
};

export default Schedule;
