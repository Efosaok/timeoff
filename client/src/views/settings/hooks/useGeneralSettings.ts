import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import useScheduleSelectors from "../../../components/partials/bits/hooks/useScheduleSelector";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { formatUpdateSettingsInputPreflight, scrollToTop } from "../../../utils/helpers";

const useGeneralSettings = () => {
  const url = '/settings/general';

  const { data: settingsData, isLoading, error: pageError } = useQuery(url, () => fetchInstance.get(url));
  const { messages, errors, updateFlash } = useFlash();

  const res = settingsData?.data;

  const countries = Object.entries(res?.countries || {});

  const carryOverAllowanceFn = () => fetchInstance.post('/settings/carryOverUnusedAllowance');
  const { mutate, data: carryOver, isLoading: carryingOver } = useMutation(carryOverAllowanceFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    }
  });

  const carryAllowanceOver = () => mutate();

  const carryOverData = carryOver?.data;

  const {
    onChangeSchedule,
    updateSchedule,
    updatingSchedule
  } = useScheduleSelectors(res?.schedule, updateFlash);

  const { inputs, onChange } = useInputs({});
  const updateSettingsFn = () =>
    fetchInstance.post('/settings/company/', formatUpdateSettingsInputPreflight(res, inputs));
  const {
    mutate: updateSettingsMutate,
    isLoading: updatingSettings,
  } = useMutation<AxiosResponse<any, any>, any>(updateSettingsFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    }
  });
  const updateSettings = () => updateSettingsMutate();

  return {
    isLoading,
    countries,
    res,
    carryOverData,
    carryAllowanceOver,
    carryingOver,
    updateSchedule,
    updatingSchedule,
    onChangeSchedule,
    inputs,
    onChange,
    updateSettings,
    updatingSettings,
    pageError,
    messages,
    errors,
    updateFlash,
  }
};

export default useGeneralSettings;
