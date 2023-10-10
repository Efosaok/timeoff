import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import useInputs from "../../../../hooks/useInputs";
import { ADD_BLOCKED_VIEW_DEFAULTS } from "../../../../utils/constants";

const useAddBlockedView = () => {
  const url = '/settings/blocked-views';
  const queryClient = useQueryClient();

  const { data: dptData, isLoading: fetchingDpts, error: fetchingDptsErr } = useQuery('/settings/departments-list', () => fetchInstance.get('/settings/departments-list'));
  const departments = dptData?.data?.departments;
  const userDepartmentId = dptData?.data?.loggedUser?.DepartmentId;
  
  const { inputs, onChange, clearInputs } = useInputs(ADD_BLOCKED_VIEW_DEFAULTS, true);
  const addBlockedViewFn = () => fetchInstance.post(url, inputs);
  const { mutate, isLoading, data, error } = useMutation<AxiosResponse<any, any>, any>(addBlockedViewFn,{
    onSuccess: (newData) => {
      clearInputs();
      queryClient.setQueryData('/settings/blocked-views', (cacheData: any) => {
        const viewsList = cacheData?.data?.views?.concat(newData?.data?.newBlockedView);
        const newCacheData = {
          ...cacheData,
          data: {
            ...cacheData?.data,
            views: viewsList,
          },
        };

        return newCacheData;
      });
    }
  });
  const addBlockedView = () => mutate();

  const messages = data?.data?.messages;
  const errors = error?.response?.data?.errors as any;

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
  }
};

export default useAddBlockedView;
