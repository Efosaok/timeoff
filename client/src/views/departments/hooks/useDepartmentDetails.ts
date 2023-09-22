import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchInstance from "../../../axios/fetchInstance";

const useDepartmentDetails = () => {
  const { id } = useParams();

  const fetchUrl = `/settings/departments/edit/${id}`;

  const { data, isLoading } = useQuery(fetchUrl, () => fetchInstance.get(fetchUrl))

  const res = data?.data;

  return {
    res,
    isLoading,
  }
};

export default useDepartmentDetails;
