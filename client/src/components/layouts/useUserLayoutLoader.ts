import { useQuery } from "react-query";
import { useMatches, useParams } from "react-router-dom";
import fetchInstance from "../../axios/fetchInstance";

export interface UserDetailsRes {
  isOnDetails: boolean;
  isOnAbsence: boolean;
  isOnCalendar: boolean;
  isOnSchedule: boolean;
  res: any;
}

const useUserLayoutLoader = (): UserDetailsRes => {
  const { id } = useParams();
  const matches = useMatches();
  const url = `users/edit/${id}`;

  const { data } = useQuery(url, () => fetchInstance.get(url));

  const res = data?.data;

  const pathId = matches[matches?.length - 1].id;
  const isOnDetails = pathId === 'details';
  const isOnAbsence = pathId === 'absence';
  const isOnCalendar = pathId === 'u-cal';
  const isOnSchedule = pathId === 'schedule';

  console.log(isOnDetails, matches);

  return {
    res,
    isOnDetails,
    isOnAbsence,
    isOnCalendar,
    isOnSchedule,
  };
};

export default useUserLayoutLoader;
