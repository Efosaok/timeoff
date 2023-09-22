const generateLeavesMetaData = (leaves) => {
  const allMetas = {}
  leaves.forEach((leave) => {
    const newMeta = {};
    newMeta.deductedDays = leave.get_deducted_days_number();
    newMeta.startLeaveDay = leave.get_start_leave_day();
    newMeta.endLeaveDay = leave.get_end_leave_day();
    newMeta.startsHalfMorning = leave.does_start_half_morning();
    newMeta.startHalfAfternoon = leave.does_start_half_afternoon();
    newMeta.startQuarterAfternoon = leave.does_start_quarter_afternoon();
    newMeta.endsHalfMorning = leave.does_end_half_morning();
    newMeta.endsHalfAfternoon = leave.does_end_half_afternoon();
    newMeta.endsQuarterAfternoon = leave.does_end_quarter_afternoon();
    delete newMeta.startLeaveDay.sequelize;
    delete newMeta.endLeaveDay.sequelize;
    allMetas[leave.id] = newMeta;
  });

  return allMetas;
};

const generateGroupedLeavesMeta = (groupedLeaves, leaves) => {
  if (groupedLeaves) {
    const allLeaves = groupedLeaves.flatMap((group) => group.leaves);
    return generateLeavesMetaData(allLeaves);
  } else {
    return generateLeavesMetaData(leaves)
  }
};

module.exports = generateGroupedLeavesMeta;
