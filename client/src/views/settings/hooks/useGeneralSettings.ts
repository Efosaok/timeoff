import { AxiosResponse } from "axios";
import {  useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import ModalContext from "../../../contexts/ModalContext";
import useInputs from "../../../hooks/useInputs";
import { formatScheduleToApiFormat, formatUpdateSettingsInputPreflight, scrollToTop } from "../../../utils/helpers";

const useGeneralSettings = () => {
  const url = '/settings/general';

  const { data: settingsData, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const res = settingsData?.data;

  const countries = Object.entries(res?.countries || {});

  const carryOverAllowanceFn = () => fetchInstance.post('/settings/carryOverUnusedAllowance');
  const { mutate, data: carryOver, isLoading: carryingOver } = useMutation(carryOverAllowanceFn, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
    },
    onError: () => {
      toast.error('Failed to carry over allowance')
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
      toast.success(data?.data?.message);
    },
    onError: () => {
      toast.error('Failed to carry over unused allowance')
    }
  });
  const updateSchedule = () => updateScheduleMutate();

  const { inputs, onChange } = useInputs({});
  const updateSettingsFn = () =>
    fetchInstance.post('/settings/company/', formatUpdateSettingsInputPreflight(res, inputs));
  const { mutate: updateSettingsMutate, isLoading: updatingSettings, data, error } = useMutation<AxiosResponse<any, any>, any>(updateSettingsFn, {
    onSuccess: () => {
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
    error: deleteError,
    variables: selectedLeaveType,
  } = useMutation(deleteLeaveTypeFn)
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
    updateErrors,
    updateMessage,
    toggleModal,
    deleteLeaveType,
    deletingLeaveType,
    // deleteErrors,
    deleteMessages,
    selectedLeaveType,
  }
};

export default useGeneralSettings;
