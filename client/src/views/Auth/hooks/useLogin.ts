import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";
import instance from "../../../axios/fetchInstance"
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { scrollToTop } from "../../../utils/helpers";

const defaultInputs = {
  username: '',
  password: '',
};

interface LoginSuccess {
  response: {
    data: {
      user: any;
      messages: string[];
    }
  }
}

interface LoginError {
  response: {
    data: {
      errors: string[];
    }
  }
}

const useLogin = () => {
  const { inputs, onChange } = useInputs(defaultInputs);
  const navigate = useNavigate();

  const { errors, updateFlash } = useFlash()
  const { mutate, error, isLoading } = useMutation<AxiosResponse<any, any>, any>(
    () => instance.post('/login', inputs),
    {
      onSuccess: (data) => {
        navigate('/calendar');
        toast.success(data?.data?.messages?.[0])
      },
      onError: (err) => {
        updateFlash(err?.response?.data?.errors, 'errors');
        scrollToTop();
      }
    });

  const login = () => mutate();

  return {
    login,
    error,
    inputs,
    onChange,
    errors,
    isLoading,
  }
}

export default useLogin;
