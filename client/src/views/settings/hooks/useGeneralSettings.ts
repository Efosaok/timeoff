import { useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";

const useGeneralSettings = () => {
  const url = '/settings/general';

  const { data: settingsData, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const res = settingsData?.data;

  const countries = Object.entries(res?.countries || {});

  return {
    isLoading,
    countries,
    res,
  }
};

export default useGeneralSettings;
