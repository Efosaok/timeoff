import { useMutation, useQuery } from "react-query"
import fetchInstance from "../../../axios/fetchInstance";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { scrollToTop } from "../../../utils/helpers";

const useCompanyAuthentication = () => {
  const url = '/settings/company/authentication';
  const { data, isLoading, error } = useQuery(url, () => fetchInstance(url));

  const res = data?.data;

  const { updateFlash, messages, errors } = useFlash();

  const { inputs, onChange } = useInputs({})
  const saveLdapFn = () => fetchInstance.post(url, inputs);
  const { mutate, isLoading: savingLdap } = useMutation(saveLdapFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages)
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    }
  });
  const saveLdap = () => mutate();

  return {
    res,
    isLoading,
    saveLdap,
    savingLdap,
    onChange,
    messages,
    errors,
    error
  }
}

export default useCompanyAuthentication;
