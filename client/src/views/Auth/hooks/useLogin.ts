import { useMutation } from "react-query"
import instance from "../../../axios/fetchInstance"
import useInputs from "../../../hooks/useInputs";

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

  const { mutate, error } = useMutation<LoginSuccess, LoginError>(
    () => instance.post('/login', inputs),
    {
      onSuccess: () => {},
    });

  const login = () => mutate();

  return {
    login,
    error,
    inputs,
    onChange,
  }
}

export default useLogin;
