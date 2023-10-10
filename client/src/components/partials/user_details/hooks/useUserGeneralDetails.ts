import moment from "moment";
import { useMutation } from "react-query";
import { useOutletContext } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance";
import useInputs from "../../../../hooks/useInputs";
import { SAVE_EMPLOYEE_DEFAULTS } from "../../../../utils/constants";
import { scrollToTop } from "../../../../utils/helpers";

const useUserGeneralDetails = () => {
  const { res, updateFlash } = useOutletContext() as any;

  const { inputs, onChange } = useInputs(SAVE_EMPLOYEE_DEFAULTS);
  const saveUserDetailsFn = () => {
    const inputsToSend = {
      name: res?.employee?.name,
      lastname: res?.employee?.lastname,
      email_address: res?.employee?.email,
      department: res?.employee?.DepartmentId,
      admin: res?.employee?.admin,
      auto_approve: res?.employee?.auto_approve,
      start_date: res?.employee?.start_date ? moment(res?.employee?.start_date).format(res?.company?.date_format) : null,
      end_date: res?.employee?.end_date ? moment(res?.employee?.end_date).format(res?.company?.date_format) : null,
      ...inputs,
    }

    return fetchInstance.post(`/users/edit/${res?.employee?.id}`, inputsToSend);
  }
  const { mutate, isLoading } = useMutation(saveUserDetailsFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    },
  });
  const saveUserDetails = () => mutate();

  return {
    onChange,
    saveUserDetails,
    isLoading,
    res,
  }
};

export default useUserGeneralDetails;
