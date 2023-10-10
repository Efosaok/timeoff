import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance";
import { UserLayoutOutletContextProps } from "../../../layouts/useUserLayoutLoader";
import useScheduleSelectors from "../../bits/hooks/useScheduleSelector";

const useUserSchedule = () => {
  const { updateFlash } = useOutletContext() as UserLayoutOutletContextProps;
  const { id } = useParams();
  const url = `users/edit/${id}/schedule`;

  const { data, isLoading, error } = useQuery(url, () => fetchInstance.get(url));
  const res = data?.data;

  const {
    onChangeSchedule,
    revokeUserSpecificSchedule,
    saveUserSpecificSchedule,
    updatingSchedule,
    revokingSchedule,
    savingSchedule,
    isUserSpecificFromUpdate,
  } = useScheduleSelectors(res?.schedule, updateFlash);

  const isUserSpecific = isUserSpecificFromUpdate || res?.isUserSpecific;

  return {
    res,
    isLoading,
    error,
    onChangeSchedule,
    updatingSchedule,
    revokeUserSpecificSchedule,
    saveUserSpecificSchedule,
    revokingSchedule,
    savingSchedule,
    isUserSpecific,
  };
};

export default useUserSchedule;
