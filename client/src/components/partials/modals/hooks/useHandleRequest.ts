import React from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import useFetchLeaveFormData from "../../../../hooks/useFetchLeaveFormData";
import useInputs from "../../../../hooks/useInputs";

const useHandleRequest = (leave: any, toggleModal: (leave: Record<string, any>) => void) => {
  const { res, isLoading } = useFetchLeaveFormData();

  const { inputs, onChange, clearInputs, setInputs } = useInputs({});
  const approveRequestFn = () => fetchInstance.post('/requests/approve/', {
    mod_leave_type: leave?.leaveTypeId,
    ...inputs,
    request: leave?.id,
  });
  const { mutate: approveMutate, isLoading: approving } = useMutation(approveRequestFn, {
    onSuccess: () => {
      toast.success('Leave approved successfully');
      clearInputs();
      toggleModal({});
    },
    onError: () => {
      toast.error('An error occured');
    }
  });
  const approveRequest = () => approveMutate();

  const rejectRequestFn = () => fetchInstance.post('/requests/reject/', {
    mod_leave_type: leave?.leaveTypeId,
    ...inputs,
    request: leave?.id,
  });
  const { mutate: rejectMutate, isLoading: rejecting } = useMutation(rejectRequestFn, {
    onSuccess: () => {
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
