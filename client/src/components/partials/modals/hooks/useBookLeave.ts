import moment from "moment";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import { addItemToList } from "../../../../cache/updates";
import ModalContext from "../../../../contexts/ModalContext";
import useFetchLeaveFormData from "../../../../hooks/useFetchLeaveFormData";
import useFlash from "../../../../hooks/useFlash";
import useInputs from "../../../../hooks/useInputs";
import { BOOK_LEAVE_DEFAULTS } from "../../../../utils/constants";
import { scrollToTop } from "../../../../utils/helpers";

const useBookLeave = () => {
  const { res, url, isLoading, error } = useFetchLeaveFormData();
  const queryClient = useQueryClient();

  const { toggleShowModal } = useContext(ModalContext);

  const { messages, errors, updateFlash, showFlash, setShowFlash } = useFlash();
  const { inputs, onChange } = useInputs(BOOK_LEAVE_DEFAULTS);
  const bookLeaveFn = () => {
    const inputsToSend = () => ({
      user: res?.loggedUser?.id,
      leave_type: res?.company?.leave_types?.[0]?.id,
      ...inputs,
      from_date: moment(inputs?.from_date).format("MM/DD/YY"),
      to_date: moment(inputs?.to_date).format("MM/DD/YY"),
    });
  
    return fetchInstance.post(url, inputsToSend());
  }
  const { mutate, isLoading: booking } = useMutation(bookLeaveFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
      addItemToList({
        data,
        dataPath: 'leave',
        itemsPath: 'to_be_approved_leaves',
        queryKey: '/requests',
      });
      queryClient.invalidateQueries('/requests');
      queryClient.invalidateQueries('/calendar');
    },
    onError: (err: any) => updateFlash(err?.response?.data?.errors, 'errors'),
    onSettled: () => setShowFlash(true),
  });
  const bookLeave = () => {
    setShowFlash(false)
    mutate();
  };

  const disableTimeField = inputs?.from_date !== inputs?.to_date;

  return {
    res,
    isLoading,
    toggleShowModal,
    bookLeave,
    booking,
    messages,
    errors,
    onChange,
    disableTimeField,
    error,
    showFlash,
  }
};

export default useBookLeave;
