import moment from "moment";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";
import { removeItemFromList } from "../../cache/updates";
import ModalContext from "../../contexts/ModalContext";
import useFlash from "../../hooks/useFlash";
import useInputs from "../../hooks/useInputs";
import useSearchParamsInQuery from "../../hooks/useSearchParamsInQuery";
import { getInputDates, scrollToTop } from "../../utils/helpers";

const useBankHolidays = () => {
  const url = '/settings/bankholidays';
  const { urlWithSearchQuery } = useSearchParamsInQuery(url);
  const { data, isLoading, error } = useQuery(urlWithSearchQuery, () => fetchInstance(urlWithSearchQuery));

  const res = data?.data;

  const { messages, errors, updateFlash } = useFlash();

  const { toggleShowModal } = useContext(ModalContext);
  const toggleModal = () => toggleShowModal('addBankHoliday');

  const deleteBankHolidayFn = (id: string) => fetchInstance.post(`/settings/bankholidays/delete/${id}`);
  const { mutate: deleteBankHolidayMutate, isLoading: deletingHoliday, variables: selectedId } = useMutation(deleteBankHolidayFn, {
    onSuccess: (data, id) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
      removeItemFromList({
        queryId: id,
        dataPath: '',
        itemsPath: 'bankHolidays',
        queryKey: '/settings/bankholidays',
      });
    },
    onError: (err: any) => {
      updateFlash(err.response?.data?.errors);
      scrollToTop();
    }
  });
  const deleteBankHoliday = (id: string) => deleteBankHolidayMutate(id);

  const showDeletingLoader = (id: string) => deletingHoliday && id === selectedId;

  const { onChange, inputs } = useInputs({});
  const saveBankHolidaysFn = () => {
    let previousData: Record<string, string> = {};
    res?.bankHolidays?.forEach((holiday: any) => {
      previousData[`name__${holiday?.id}`] = holiday?.name;
      previousData[`date__${holiday?.id}`] = moment(holiday?.date).format('MM/DD/YY');
    });

    const dateInputs = getInputDates();

    const inputsToSend = {
      ...previousData,
      ...inputs,
      ...dateInputs,
    };

    return fetchInstance.post('/settings/bankholidays', inputsToSend);
  }
  const { mutate, isLoading: savingHolidays } = useMutation(saveBankHolidaysFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err.response?.data?.errors);
      scrollToTop();
    }
  });
  const saveHolidays = () => mutate();

  return {
    res,
    isLoading,
    toggleModal,
    deleteBankHoliday,
    deletingHoliday,
    showDeletingLoader,
    messages,
    onChange,
    errors,
    saveHolidays,
    savingHolidays,
    error,
  };
};

export default useBankHolidays;
