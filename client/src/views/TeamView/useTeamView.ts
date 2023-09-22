import { useState } from "react";
import { useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";
import useSearchParamsInQuery from "../../hooks/useSearchParamsInQuery";

const useTeamView = () => {
  const { urlWithSearchQuery, params } = useSearchParamsInQuery('/calendar/teamview');
  const [selectedDepartment, setSelectedDepartment] = useState({ id: '', name: '' });
  const { data: teamViewData, isLoading, error } = useQuery(urlWithSearchQuery, () => fetchInstance.get(urlWithSearchQuery));

  const groupedMode = params.get('grouped_mode')
  const isGroupedMode = !!groupedMode && groupedMode !== '0';
  const currentDate = params.get('date') || teamViewData?.data?.base_date?.slice(0, 7);

  return {
    teamViewData,
    isLoading,
    error,
    isGroupedMode,
    selectedDepartment,
    setSelectedDepartment,
    currentDate,
  }
};

export default useTeamView;
