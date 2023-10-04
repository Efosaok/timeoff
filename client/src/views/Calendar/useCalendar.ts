import { useQuery } from "react-query"
import fetchInstance from "../../axios/fetchInstance"
import useFlash from "../../hooks/useFlash";
import useSearchParamsInQuery from "../../hooks/useSearchParamsInQuery";

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

const useCalendar = () => {
  const url = '/calendar';
  const { urlWithSearchQuery, params } = useSearchParamsInQuery(url);

  const { messages, errors, updateFlash } = useFlash(); 
  const showFullYear = params.get('show_full_year');
  const { data, isLoading, error } = useQuery(urlWithSearchQuery, () => fetchInstance.get(urlWithSearchQuery));

  const loggedUser = data?.data?.loggedUser;

  const res = data?.data;

  return {
    isLoading,
    loggedUser,
    showFullYear,
    res,
    error,
    messages,
    errors,
    updateFlash,
  };
};

export default useCalendar;
