import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../../App";
import fetchInstance from "../../../axios/fetchInstance";
import useInputs from "../../../hooks/useInputs";

const useEmployeeAddition = () => {
  const url = '/users/add';

  const { data } = useQuery(url, () => fetchInstance(url));
  const { inputs, onChange } = useInputs({});

  const addUser = () => fetchInstance.post(url, inputs);
  const { mutate, isLoading: adding } = useMutation(addUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        '/users',
        (cache: any) => cache?.data?.users_info?.concat(data?.data?.new_user));
      toast.success('User added successfully');
    },
    onError: (data) => {
      toast.error('An error occured adding user');
    },
  });

  console.log(inputs);

  const res = data?.data;

  const onSubmit = () => mutate();

  return {
    res,
    inputs,
    onChange,
    onSubmit,
    adding,
  }
}

export default useEmployeeAddition;
