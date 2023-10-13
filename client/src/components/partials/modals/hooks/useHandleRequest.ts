import React from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import { removeItemFromList } from "../../../../cache/updates";
import useFetchLeaveFormData from "../../../../hooks/useFetchLeaveFormData";
import useInputs from "../../../../hooks/useInputs";

const useHandleRequest = (leave: any, toggleModal: (leave: Record<string, any>) => void) => {
  const { res, isLoading, error } = useFetchLeaveFormData();
  const queryClient = useQueryClient();

  const { inputs, onChange, clearInputs, setInputs } = useInputs({});
  const approveRequestFn = () => fetchInstance.post('/requests/approve/', {
    mod_leave_type: leave?.leaveTypeId,
    ...inputs,
    request: leave?.id,
  });
  const { mutate: approveMutate, isLoading: approving } = useMutation(approveRequestFn, {
    onSuccess: (data) => {
      removeItemFromList({
        itemsPath: 'to_be_approved_leaves',
        queryKey: '/requests',
        data,
        dataPath: 'leave',
      });
      queryClient.invalidateQueries('/requests');
      queryClient.invalidateQueries('/calendar');
      toast.success('Leave approved successfully');
      clearInputs();
      toggleModal({});
    },
    onError: () => {
      toast.error('An error occured');
    },
  });
  const approveRequest = () => approveMutate();

  const rejectRequestFn = () => fetchInstance.post('/requests/reject/', {
    mod_leave_type: leave?.leaveTypeId,
    ...inputs,
    request: leave?.id,
  });
  const { mutate: rejectMutate, isLoading: rejecting } = useMutation(rejectRequestFn, {
    onSuccess: (data) => {
      removeItemFromList({
        itemsPath: 'to_be_approved_leaves',
        queryKey: '/requests',
        data,
        dataPath: 'leave',
      });
      queryClient.invalidateQueries('/requests');
      queryClient.invalidateQueries('/calendar');
      toast.success('Leave rejected successfully');
      clearInputs();
      toggleModal({});
    },
    onError: () => {
      toast.error('An error occured');
    }
  });
  const rejectRequest = () => rejectMutate();

  const onChangeRejecterComment = ({ target: { value }}: React.ChangeEvent<HTMLTextAreaElement>) => setInputs({
    ...inputs,
    approver_comment: '',
    rejecter_comment: value,
  });

  const onChangeApproverComment = ({ target: { value }}: React.ChangeEvent<HTMLTextAreaElement>) => setInputs({
    ...inputs,
    approver_comment: value,
    rejecter_comment: '',
  });

  return {
    res,
    isLoading,
    error,
    onChange,
    approving,
    approveRequest,
    rejecting,
    rejectRequest,
    onChangeApproverComment,
    onChangeRejecterComment,
    inputs,
  }
};

export default useHandleRequest;
