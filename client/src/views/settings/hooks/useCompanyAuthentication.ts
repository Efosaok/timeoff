import { useQuery } from "react-query"
import fetchInstance from "../../../axios/fetchInstance";

const useCompanyAuthentication = () => {
  const url = '/settings/company/authentication';
  const { data, isLoading } = useQuery(url, () => fetchInstance(url));

  const res = data?.data;

  return {
    res,
    isLoading,
  }
}

export default useCompanyAuthentication;
