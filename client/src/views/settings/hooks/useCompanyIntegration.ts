import { useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";

const useCompanyIntegration = () => {
  const url = '/settings/company/integration-api/';
  const { data, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const res = data?.data;
  return {
    res,
    isLoading,
  }
};

export default useCompanyIntegration;
