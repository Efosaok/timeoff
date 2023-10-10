import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance";
import { UpdateFlashT } from "../../../../hooks/useFlash";
import { formatScheduleToApiFormat, scrollToTop } from "../../../../utils/helpers";

const useScheduleSelectors = (schedule: any, updateFlash: UpdateFlashT) => {
  const [scheduleDays, setScheduleDays] = useState({});
  const { id } = useParams();

  const onChangeSchedule = (event: any) => {
    const isSelected = event.target.classList.contains('active');
    const title = event.target.title;

    let newSchedule: Record<string, any> = { ...scheduleDays };

    if (!Object.keys(newSchedule)?.length) newSchedule = formatScheduleToApiFormat(schedule);
  
    if (!isSelected) newSchedule[title] = 'on'
    else newSchedule[title] = undefined;

    setScheduleDays(newSchedule);
  }

  console.log(scheduleDays);

  const updateScheduleFn = (opts: any) => fetchInstance
    .post(
      '/settings/schedule',
      {
        ...formatScheduleToApiFormat(schedule),
        ...scheduleDays,
        ...opts,
      },
  );
  const { mutate: updateScheduleMutate, isLoading: updatingSchedule, variables, data } = useMutation(updateScheduleFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    },
  });
  const updateSchedule = () => updateScheduleMutate({});
  const saveUserSpecificSchedule = () => updateScheduleMutate({
    user_id: id,
    save_user_specific_schedule: '',
  });
  const revokeUserSpecificSchedule = () => updateScheduleMutate({
    user_id: id,
    revoke_user_specific_schedule: '',
  });

  const revokingSchedule = variables?.revoke_user_specific_schedule === '' && updatingSchedule;
  const savingSchedule = variables?.save_user_specific_schedule === '' && updatingSchedule;

  const isUserSpecificFromUpdate = data?.data?.isUserSpecific;

  return {
    onChangeSchedule,
    scheduleDays,
    updateSchedule,
    updatingSchedule,
    saveUserSpecificSchedule,
    revokeUserSpecificSchedule,
    revokingSchedule,
    savingSchedule,
    isUserSpecificFromUpdate,
  }
}

export default useScheduleSelectors;
