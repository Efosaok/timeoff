import { useState } from "react";
import { useQuery } from "react-query"
import fetchInstance from "../../axios/fetchInstance"

interface CalWeekI {
  val: number;
  leave_obj?: string;
  is_bank_holiday?: boolean;
  is_weekend?: boolean;
}

interface CalendarI {
  month: string;
  moment: Date;
  weeks: CalWeekI;
}

interface CalendarPageResponseI {
  calendar: CalendarI[];
}

const useCalendar = () => {
  const [showFullYear, setShowFullYear] = useState(false);

  const url = showFullYear ? `/calendar?show_full_year=1` : '/calendar';

  const { data: calData, isLoading } = useQuery('calendarData', () => fetchInstance.get(url));

  const toggleShowFullYear = () => setShowFullYear(!showFullYear);

  const loggedUser = calData?.data?.loggedUser;

  return {
    calData,
    isLoading,
    loggedUser,
    showFullYear,
    toggleShowFullYear,
  };
};

export default useCalendar;
