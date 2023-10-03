import { useMutation, useQueryClient } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import { UpdateFlashT } from "../../../../hooks/useFlash";
import { scrollToTop } from "../../../../utils/helpers";

const useRequestItem = (
  id: number,
  updateFlash: UpdateFlashT,
) => {
  const queryClient = useQueryClient();

  const body = { request: id };

  const cancelLeaveRequestFn = () => fetchInstance.post('/requests/cancel/', body);
  const { mutate: cancelMutate, isLoading: cancelling } = useMutation(cancelLeaveRequestFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      queryClient.invalidateQueries('/requests');
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err.response.data.errors, 'errors');
      scrollToTop();
    },
  });
  const cancelLeaveRequest = () => cancelMutate();

  const revokeLeaveRequestFn = () => fetchInstance.post('/requests/revoke/', body);
  const { mutate: revokeMutate, isLoading: revoking } = useMutation(revokeLeaveRequestFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      queryClient.invalidateQueries('/requests');
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err.response.data.errors, 'errors');
      scrollToTop();
    },
  });
  const revokeLeaveRequest = () => revokeMutate();

  return {
    revokeLeaveRequest,
    cancelLeaveRequest,
    cancelling,
    revoking,
  }
};

export default useRequestItem;
