import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import { addItemToList } from "../../../../cache/updates";
import useFlash from "../../../../hooks/useFlash";
import useInputs from "../../../../hooks/useInputs";
import { ADD_BLOCKED_VIEW_DEFAULTS } from "../../../../utils/constants";

const useAddBlockedView = () => {
  const url = '/settings/blocked-views';

  const { messages, errors, updateFlash, showFlash, setShowFlash } = useFlash();

  const { data: dptData, isLoading: fetchingDpts, error: fetchingDptsErr } = useQuery('/settings/departments-list', () => fetchInstance.get('/settings/departments-list'));
  const departments = dptData?.data?.departments;
  const userDepartmentId = dptData?.data?.loggedUser?.DepartmentId;
  
  const { inputs, onChange, clearInputs } = useInputs(ADD_BLOCKED_VIEW_DEFAULTS, true);
  const addBlockedViewFn = () => fetchInstance.post(url, inputs);
  const { mutate, isLoading, } = useMutation<AxiosResponse<any, any>, any>(addBlockedViewFn,{
    onSuccess: (data) => {
      setShowFlash(true);
      clearInputs();
      addItemToList({
        itemsPath: 'views',
        dataPath: 'newBlockedView',
        queryKey: '/settings/blocked-views',
        data,
      });
      updateFlash(data.data.messages);
    },
    onError: (err) => {
      updateFlash(err.response.data.errors, 'errors')
    },
  });

  const addBlockedView = () => {
    setShowFlash(false);
    mutate();
  }

  return {
    inputs,
    onChange,
    messages,
    errors,
    addBlockedView,
    isLoading,
    departments,
    fetchingDpts,
    fetchingDptsErr,
    userDepartmentId,
    showFlash,
  }
};

export default useAddBlockedView;
