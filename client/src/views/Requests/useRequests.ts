import { useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";
import useSearchParamsInQuery from "../../hooks/useSearchParamsInQuery";

const useRequests = () => {
  const { urlWithSearchQuery } = useSearchParamsInQuery('/requests');
  const { data: requestsData, error, isLoading } = useQuery(urlWithSearchQuery, () => fetchInstance.get(urlWithSearchQuery));

  return {
    error,
    requestsData,
    isLoading,
  }
};

export default useRequests;
