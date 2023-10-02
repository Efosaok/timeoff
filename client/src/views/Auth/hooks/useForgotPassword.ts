import { useMutation } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { FORGOT_PASSWORD_DEFAULTS } from "../../../utils/constants";

const useForgotPassword = () => {
  const { clearInputs, onChange, inputs } = useInputs(FORGOT_PASSWORD_DEFAULTS);

  const { messages, errors, updateFlash } = useFlash();
  const forgotPasswordFn = () => fetchInstance.post('/forgot-password/');
  const { mutate, isLoading } = useMutation(forgotPasswordFn, {
    onSuccess: (data) => {
      clearInputs();
      updateFlash(data?.data?.messages);
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors')
    }
  });
  const forgotPassword = () => mutate();

  return {
    clearInputs,
    onChange,
    inputs,
    forgotPassword,
    messages,
    errors,
    isLoading,
  }
};

export default useForgotPassword;
