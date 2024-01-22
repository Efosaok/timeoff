import { AxiosResponse } from "axios";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../../App";
import fetchInstance from "../../../axios/fetchInstance";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { ADD_EMPLOYEE_DEFAULTS } from "../../../utils/constants";
import { scrollToTop } from "../../../utils/helpers";

const useEmployeeAddition = () => {
  const url = '/users/add';

  const { data } = useQuery(url, () => fetchInstance(url));
  const { inputs, onChange, clearInputs } = useInputs(ADD_EMPLOYEE_DEFAULTS);

  const res = data?.data;

  const { errors, messages, updateFlash } = useFlash();

  const addUser = () => {
    const inputsToSend = {
      ...inputs,
      start_date: moment(inputs?.start_date).format('MM/DD/YY'),
      end_date: inputs?.end_date,
      department: inputs?.department || res?.departments?.[0]?.id,
    };
    return fetchInstance.post(url, inputsToSend);
  }
  const { mutate, isLoading: adding, error, data: newUserRes } = useMutation<AxiosResponse<any>, any>(addUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        '/users',
        (cache: any) => cache?.data?.users_info?.concat(data?.data?.new_user));
      scrollToTop();
      clearInputs();
      updateFlash(data?.data?.message)
    },
    onError: (err) => {
      scrollToTop();
      updateFlash(err?.response?.data?.errors, 'errors');
    },
  });

  const onSubmit = () => mutate();

  return {
    res,
    inputs,
    onChange,
    onSubmit,
    adding,
    error,
    newUserRes,
    errors,
    messages,
  }
}

export default useEmployeeAddition;
