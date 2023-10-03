import { useMutation, useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { scrollToTop } from "../../../utils/helpers";

const useCompanyIntegration = () => {
  const url = '/settings/company/integration-api/';
  const { data, isLoading, error } = useQuery(url, () => fetchInstance.get(url));

  const res = data?.data;

  const { messages, errors, updateFlash } = useFlash();
  const { inputs, onChange } = useInputs({});

  const saveIntegrationDataFn = (regenerate_token?: string) => {
    let inputsToSend: Record<string, any> = {
      integration_api_enabled: res?.company?.integration_api_enabled ? 'on' : undefined,
      ...inputs,
    };

    if (regenerate_token) inputsToSend = { regenerate_token };
  
    return fetchInstance.post(url, inputsToSend);
  };
  const { mutate, isLoading: saving, variables } = useMutation(saveIntegrationDataFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors);
      scrollToTop();
    }
  });
  const saveIntegrationApiConfig = (regenerate_token?: string) => mutate(regenerate_token);

  const isRegeneratingToken = saving && !!variables;
  const savingIntegrationApiConfig = saving && !variables;

  return {
    res,
    isLoading,
    saveIntegrationApiConfig,
    savingIntegrationApiConfig,
    messages,
    errors,
    isRegeneratingToken,
    onChange,
    error,
  }
};

export default useCompanyIntegration;
