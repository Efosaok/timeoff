import { useQuery } from "react-query";
import { useMatches, useParams } from "react-router-dom";
import fetchInstance from "../../axios/fetchInstance";

export interface UserDetailsRes {
  isOnDetails: boolean;
  isOnAbsence: boolean;
  isOnCalendar: boolean;
  isOnSchedule: boolean;
  isLoading: boolean;
  error: any,
  res: any;
}

const useUserLayoutLoader = (): UserDetailsRes => {
  const { id } = useParams();
  const matches = useMatches();
  const url = `users/edit/${id}`;

  const { data, isLoading, error } = useQuery(url, () => fetchInstance.get(url));

  const res = data?.data;

  const pathId = matches[matches?.length - 1].id;
  const isOnDetails = pathId === 'details';
  const isOnAbsence = pathId === 'absence';
  const isOnCalendar = pathId === 'u-cal';
  const isOnSchedule = pathId === 'schedule';

  return {
    res,
    isOnDetails,
    isOnAbsence,
    isOnCalendar,
    isOnSchedule,
    isLoading,
    error,
  };
};

export default useUserLayoutLoader;
