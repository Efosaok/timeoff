const convertCalendarSundayToSaturday = (calendar) => calendar.map((period) => ({
  ...period,
  weeks: period.weeks
    .map((week) => [week[0]?.val > 1 ? { is_weekend: true, val: week[0]?.val - 1, leave_obj: null } : { val: '' }, ...week.slice(0, 6)]),
}));

module.exports = convertCalendarSundayToSaturday;