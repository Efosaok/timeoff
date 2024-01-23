import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance";
import { UserLayoutOutletContextProps } from "../../../layouts/useUserLayoutLoader";
import useUserGeneralDetails from "./useUserGeneralDetails";

const useUserAbsences = () => {
  const { id } = useParams();
  const url = `/users/edit/${id}/absences`;
  const { updateFlash } = useOutletContext() as UserLayoutOutletContextProps;

  const { data, isLoading, error } = useQuery(url, () => fetchInstance(url));

  const res = data?.data;

  const { onChange, saveUserDetails, isLoading: savingAdjustments } = useUserGeneralDetails();

  return {
    res,
    isLoading,
    error,
    updateFlash,
    onChange,
    saveUserDetails,
    savingAdjustments,
  }
}

export default useUserAbsences;
