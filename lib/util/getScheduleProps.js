const getScheduleProps = (schedule) => {
  const scheduleMeta = {};
  scheduleMeta.worksMonday = schedule.works_monday();
  scheduleMeta.worksTuesday = schedule.works_tuesday();
  scheduleMeta.worksWednesday = schedule.works_wednesday();
  scheduleMeta.worksThursday = schedule.works_thursday();
  scheduleMeta.worksFriday = schedule.works_friday();
  scheduleMeta.worksSaturday = schedule.works_saturday();
  scheduleMeta.worksSunday = schedule.works_sunday();

  return scheduleMeta;
};

module.exports = getScheduleProps;
