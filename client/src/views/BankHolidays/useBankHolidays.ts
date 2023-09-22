import { useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";
import useSearchParamsInQuery from "../../hooks/useSearchParamsInQuery";

const useBankHolidays = () => {
  const url = '/settings/bankholidays';
  const { urlWithSearchQuery } = useSearchParamsInQuery(url);
  const { data, isLoading } = useQuery(urlWithSearchQuery, () => fetchInstance(urlWithSearchQuery));

  const res = data?.data;

  return {
    res,
    isLoading,
  }
}

export default useBankHolidays;
