import { useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";

const useDepartmentsOverview = () => {
  const url = '/settings/departments';
  const { data: departmentsData, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const res = departmentsData?.data;

  return {
    res,
    isLoading,
  };
};

export default useDepartmentsOverview;