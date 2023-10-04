import { AxiosResponse } from "axios";
import {  useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import ModalContext from "../../../contexts/ModalContext";
import useFlash from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { formatScheduleToApiFormat, formatUpdateSettingsInputPreflight, scrollToTop } from "../../../utils/helpers";

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

  const [scheduleDays, setScheduleDays] = useState({});

  const onChangeSchedule = (event: any) => {
    const isSelected = event.target.classList.contains('active');
    const title = event.target.title;

    let newSchedule: Record<string, string> = { ...scheduleDays };

    if (!Object.keys(newSchedule)?.length) newSchedule = formatScheduleToApiFormat(res?.schedule);
  
    if (!isSelected) newSchedule[title] = 'on'
    else delete newSchedule[title];

    setScheduleDays(newSchedule);
  };

  const updateScheduleFn = () => fetchInstance.post('/settings/schedule', scheduleDays)
  const { mutate: updateScheduleMutate, isLoading: updatingSchedule } = useMutation(updateScheduleFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    }
  });
  const updateSchedule = () => updateScheduleMutate();

  const { inputs, onChange } = useInputs({});
  const updateSettingsFn = () =>
    fetchInstance.post('/settings/company/', formatUpdateSettingsInputPreflight(res, inputs));
  const {
    mutate: updateSettingsMutate,
    isLoading: updatingSettings,
    data,
    error
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

  const updateErrors = error?.response?.data?.errors;
  const updateMessage = data?.data?.messages;

  const { toggleShowModal } = useContext(ModalContext);

  const toggleModal = () => toggleShowModal('addLeaveType');

  const deleteLeaveTypeFn = (id: string) => fetchInstance.post(`/settings/leavetypes/delete/${id}`)
  const {
    mutate: deleteLeaveTypeMutate,
    data: deletedLeaveType,
    isLoading: deletingLeaveType,
    variables: selectedLeaveType,
  } = useMutation(deleteLeaveTypeFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    }
  })
  const deleteLeaveType = (id: string) => deleteLeaveTypeMutate(id);

  // const deleteErrors = deleteError?.response?.data?.errors as any;
  const deleteMessages = deletedLeaveType?.data?.messages;

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
    toggleModal,
    deleteLeaveType,
    deletingLeaveType,
    deleteMessages,
    selectedLeaveType,
    pageError,
    messages,
    errors,
  }
};

export default useGeneralSettings;
