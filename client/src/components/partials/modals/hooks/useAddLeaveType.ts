import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import useInputs from "../../../../hooks/useInputs";
import { ADD_LEAVE_TYPE_INITIALS } from "../../../../utils/constants";
import { pickColor } from "../../../../utils/helpers";

const useAddLeaveType = () => {
  const { onChange, inputs, clearInputs } = useInputs(ADD_LEAVE_TYPE_INITIALS);
  const addLeaveTypeFn = () => fetchInstance.post('/settings/leavetypes', inputs);
  const { mutate, data, isLoading, error } = useMutation<AxiosResponse<any, any>, any>(
    addLeaveTypeFn,
    {
      onSuccess: () => {
        clearInputs();
      }
    }
    );
  const addLeaveType = () => mutate();

  const onSelectLeaveTypeColor = (color: string) => pickColor(color, onChange);

  const messages = data?.data?.messages;
  const errors = error?.response?.data?.errors;

  return {
    onChange,
    addLeaveType,
    isLoading,
    messages,
    errors,
    inputs,
    onSelectLeaveTypeColor,
  };
};

export default useAddLeaveType;
