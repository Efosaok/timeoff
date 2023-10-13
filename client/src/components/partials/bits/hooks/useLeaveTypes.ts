import { useContext } from "react";
import { useMutation } from "react-query";
import fetchInstance from "../../../../axios/fetchInstance";
import ModalContext from "../../../../contexts/ModalContext";
import { UpdateFlashT } from "../../../../hooks/useFlash";
import useInputs from "../../../../hooks/useInputs";
import { pickColor, scrollToTop } from "../../../../utils/helpers";

const useLeaveTypes = (
  updateFlash: UpdateFlashT,
  leaveTypes: Record<string, any>[],
) => {
  const deleteLeaveTypeFn = (id: string) => fetchInstance.post(`/settings/leavetypes/delete/${id}`);

  const {
    mutate: deleteLeaveTypeMutate,
    isLoading: deletingLeaveType,
    variables: selectedLeaveType,
  } = useMutation(deleteLeaveTypeFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    }
  });
  const deleteLeaveType = (id: string) => deleteLeaveTypeMutate(id);

  const { toggleShowModal } = useContext(ModalContext);

  const toggleModal = () => toggleShowModal('addLeaveType');

  const { inputs, onChange } = useInputs({});

  const updateLeaveTypesFn = () => {
    const inputsFromLeaveTypes = leaveTypes.reduce((acc: Record<string, any>, curr: Record<string, any>) => {
      acc[`name__${curr.id}`] = curr.name;
      acc[`color__${curr.id}`] = curr.color;
      acc.first_record = curr.sort_order ? curr.id : undefined;
      acc[`use_allowance__${curr.id}`] = curr.use_allowance || undefined;
      acc[`limit__${curr.id}`] = curr.limit;

      return acc
    }, {});
    const inputsToSend = {
      ...inputsFromLeaveTypes,
      ...inputs,
    };
    return fetchInstance.post('/settings/leavetypes/', inputsToSend);
  };

  const { mutate, isLoading } = useMutation(updateLeaveTypesFn, {
    onSuccess: (data) => {
      updateFlash(data?.data?.messages);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.errors, 'errors');
      scrollToTop();
    },
  });

  const updateLeaveTypes = () => mutate();

  const onSelectLeaveTypeColor = (color: string, name: string) => pickColor(color, onChange, name);

  return {
    deletingLeaveType,
    selectedLeaveType,
    deleteLeaveType,
    toggleModal,
    updateLeaveTypes,
    isLoading,
    onSelectLeaveTypeColor,
    inputs,
  };
};

export default useLeaveTypes;
