import React from "react";

const LeaveDates = ({ leave }: any) => (
  <div>
    {leave?.startLeaveDay?.date}
    {leave?.startsHalfMorning ? '(AM 1/2 Day)' : null}
    {leave?.startHalfAfternoon ? '(PM 1/2 Day)' : null}
    {leave?.startQuarterAfternoon ? '(Quarter Day)' : null }
    {' '}
    <i className="fa fa-long-arrow-right"></i>
    {' '}
    {leave?.endLeaveDay?.date}
    {leave?.endsHalfMorning ? '(AM 1/2 Day)' : null}
    {leave?.endsHalfAfternoon ? '(PM 1/2 Day)' : null}
    {leave?.endsQuarterAfternoon ? '(Quarter Day)' : null }
  </div>
);

export default LeaveDates;
