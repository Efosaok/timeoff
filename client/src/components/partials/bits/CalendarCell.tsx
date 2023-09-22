import classNames from "classnames";
import React from "react";

const CalendarCell = ({ day }: any) => {
  const firsthalfClasses = classNames(
    'calendar_cell',
    'half_1st',
    `day_${day.val}`,
    day.leave_color_class_morning,
    {
      'bank_holiday_cell': day.is_bank_holiday,
      'weekend_cell': day.is_weekend,
      'leave_cell_pended': day.is_leave_morning && day.is_new_leave,
      'leave_cell': day.is_leave_morning && !day.is_new_leave,
      'current_day_cell': day.is_current_day,
    }
  );

  const secondHalfClasses = classNames(
    'calendar_cell',
    'half_2nd',
    `day_${day.val}`,
    day.leave_color_class_afternoon,
    {
      'bank_holiday_cell': day.is_bank_holiday,
      'weekend_cell': day.is_weekend,
      'leave_cell_pended': day.is_leave_afternoon && day.is_new_leave,
      'leave_cell': day.is_leave_afternoon && !day.is_new_leave,
      'current_day_cell': day.is_current_day,
    }
  )

  return (
    <>
      <td className={firsthalfClasses}>
        <span>
          {day.val}
        </span>
      </td>
      <td className={secondHalfClasses} />
    </>
  );
}

export default CalendarCell;
