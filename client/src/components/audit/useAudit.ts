import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import fetchInstance from "../../axios/fetchInstance";
import useInputs from "../../hooks/useInputs";
import useSearchParamsInQuery from "../../hooks/useSearchParamsInQuery";

const useEmail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { inputs, onChange, clearInputs } = useInputs({ user_id: '', start_date: '', end_date: '' });
  const { urlWithSearchQuery, params, search } = useSearchParamsInQuery(pathname);

  const { data, isLoading, error } = useQuery(urlWithSearchQuery, () => fetchInstance.get(urlWithSearchQuery));

  const res = data?.data;

  let userId: number = Number(params?.get('user_id')) || 0;

  const filter = () => navigate(`${pathname}?user_id=${inputs?.user_id}&start_date=${inputs?.start_date}&end_date=${inputs?.end_date}`);

  const canReset = params.get('user_id') || params.get('start_date') || params.get('end_date');

  return {
    res,
    isLoading,
    userId,
    search,
    inputs,
    onChange,
    clearInputs,
    filter,
    canReset,
    error,
  }
};

export default useEmail;
