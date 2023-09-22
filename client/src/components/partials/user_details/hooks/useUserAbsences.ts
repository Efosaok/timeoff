import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance";

const useUserAbsences = () => {
  const { id } = useParams();
  const url = `users/edit/${id}/absences`;

  const { data } = useQuery(url, () => fetchInstance(url));

  const res = data?.data;

  return {
    res,
  }
}

export default useUserAbsences;
