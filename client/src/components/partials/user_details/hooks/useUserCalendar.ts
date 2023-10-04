import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance";
import useSearchParamsInQuery from "../../../../hooks/useSearchParamsInQuery";

const useUserCalendar = () => {
  const { id } = useParams();
  const url = `users/edit/${id}/calendar`;
  const { urlWithSearchQuery } = useSearchParamsInQuery(url);

  const { data, isLoading, error } = useQuery(urlWithSearchQuery, () => fetchInstance.get(urlWithSearchQuery));

  const res = data?.data;

  return {
    res,
    isLoading,
    error,
  }
};

export default useUserCalendar;
