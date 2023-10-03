import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import fetchInstance from "../../../axios/fetchInstance";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import useSearchParamsInQuery from "../../../hooks/useSearchParamsInQuery";
import { RESET_PASSWORD_DEFAULTS } from "../../../utils/constants";

const useResetPassword = () => {
  const { pathname } = useLocation();
  const { urlWithSearchQuery } = useSearchParamsInQuery(pathname);

  const { error: validateTokenError, isLoading: validateTokenLoading, data } = useQuery(pathname, () => fetchInstance.get(urlWithSearchQuery))

  const navigate = useNavigate();

  const t = data?.data?.token;
  const { errors, updateFlash } = useFlash();
  const { onChange, inputs } = useInputs(RESET_PASSWORD_DEFAULTS);
  const resetPasswordFn = () => fetchInstance.post(urlWithSearchQuery, { ...inputs, t });
  const { mutate, isLoading } = useMutation(resetPasswordFn, {
    onSuccess: () => {
      navigate('/login');
      toast.success('Login with new credentials');
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
    validateTokenError,
    validateTokenLoading,
  }
};

export default useResetPassword;
