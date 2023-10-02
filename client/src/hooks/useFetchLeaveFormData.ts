import { useQuery } from "react-query";
import fetchInstance from "../axios/fetchInstance";

const useFetchLeaveFormData = () => {
  const url = '/calendar/bookleave';

  const { data, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const res = data?.data;

  return {
    isLoading,
    res,
    url,
  }
};

export default useFetchLeaveFormData;
