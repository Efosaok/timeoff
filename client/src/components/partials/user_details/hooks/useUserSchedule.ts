import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance";

const useUserSchedule = () => {
  const { id } = useParams();
  const url = `users/edit/${id}/schedule`;
  const { data } = useQuery(url, () => fetchInstance.get(url));
  const res = data?.data;

  return {
    res,
  };
};

export default useUserSchedule;