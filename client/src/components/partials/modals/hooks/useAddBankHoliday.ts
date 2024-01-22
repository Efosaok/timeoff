import { AxiosResponse } from "axios";
import moment from "moment";
import { useMutation } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import { addItemToList } from "../../../../cache/updates";
import useInputs from "../../../../hooks/useInputs";
import { ADD_BANK_HOLIDAY } from "../../../../utils/constants";

const useAddBankHoliday = () => {
  const { onChange, inputs, clearInputs } = useInputs(ADD_BANK_HOLIDAY);

  const addBankHolidayFn = () => {
    const inputsToSend = () => ({
      ...inputs,
      date__new: moment(inputs?.date__new).format('MM/DD/YY'),
    });

    return fetchInstance.post('/settings/bankholidays/', inputsToSend());
  }

  const { mutate, data, error, isLoading } = useMutation<AxiosResponse<any, any>, any>(addBankHolidayFn, {
    onSuccess: (data) => {
      clearInputs({}, ['#bank_holiday_date_new']);
      addItemToList({
        data,
        dataPath: 'bankHolidays',
        itemsPath: 'bankHolidays',
        queryKey: '/settings/bankholidays',
      });
    },
  });
  const addBankHoliday = () => mutate();

  const messages = data?.data?.messages;
  const errors = error?.response?.data?.errors;

  return {
    onChange,
    inputs,
    addBankHoliday,
    isLoading,
    messages,
    errors,
  }
};

export default useAddBankHoliday;
