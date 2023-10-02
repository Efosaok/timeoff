import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import fetchInstance from "../../../axios/fetchInstance";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import useSearchParamsInQuery from "../../../hooks/useSearchParamsInQuery";
import { RESET_PASSWORD_DEFAULTS } from "../../../utils/constants";

const useResetPassword = () => {
  const { pathname } = useLocation();
  const { urlWithSearchQuery } = useSearchParamsInQuery(pathname);

  const navigate = useNavigate();

  const { errors, updateFlash } = useFlash();
  const { onChange, inputs } = useInputs(RESET_PASSWORD_DEFAULTS);
  const resetPasswordFn = () => fetchInstance.post(urlWithSearchQuery, inputs);
  const { mutate, isLoading } = useMutation(resetPasswordFn, {
    onSuccess: () => {
      navigate('/login');
    },
    onError: (err: any) => {
      if (err?.response?.data?.redirect) navigate('/forgot-password');
      else updateFlash(err?.response?.data?.errors, 'errors');
    }
  });
  const resetPassword = () => mutate();

  return {
    errors,
    resetPassword,
    onChange,
    isLoading,
  }
};

export default useResetPassword;
