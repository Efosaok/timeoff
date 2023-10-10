import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import fetchInstance from "../../../axios/fetchInstance";
import ModalContext from "../../../contexts/ModalContext";
import { UpdateFlashT } from "../../../hooks/useFlash";
import useInputs from "../../../hooks/useInputs";
import { scrollToTop } from "../../../utils/helpers";

interface DepartmentDetailsHookProp {
  updateFlash: UpdateFlashT;
  department: Record<string, number | string>,
}
const useDepartmentDetailsForm = ({ department, updateFlash }: DepartmentDetailsHookProp) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { toggleShowModal, setModalVisibility } = useContext(ModalContext);
  const toggleModal = () => toggleShowModal('selectSupervisors');

  const { inputs, onChange } = useInputs({});
  const updateDepartmentsFn = (opts?: Record<string, any>) => {
    const inputsToSend = {
      name: department?.name,
      boss_id: department?.bossId,
      allowance: department.allowance,
      include_public_holidays: department?.include_public_holidays,
      is_accrued_allowance: department?.is_accrued_allowance,
      ...inputs,
      ...opts,
    };

    return fetchInstance.post(`/settings/departments/edit/${id}`, inputsToSend);
  }
  const { mutate, isLoading, variables } = useMutation(updateDepartmentsFn, {
    onSuccess: (data) => {
      setModalVisibility(false, 'selectSupervisors');
      updateFlash(data?.data?.messages);
      queryClient.invalidateQueries(`/settings/departments/edit/${id}`);
      scrollToTop();
    },
    onError: (err: any) => {
      updateFlash(err?.response?.data?.messages, 'errors');
      scrollToTop();
    },
  });
  const saveDepartmentDetails = () => mutate({});

  const removeSupervisor = (id: number) => mutate({ remove_supervisor_id: id });
  const removingSupervisor = (id: number) => isLoading && id === variables?.remove_supervisor_id;

  const addSupervisors = (supervisors: string[]) => 
    mutate({
      supervisor_id: supervisors,
      do_add_supervisors: 1,
  });

  return {
    saveDepartmentDetails,
    inputs,
    onChange,
    isLoading,
    removeSupervisor,
    removingSupervisor,
    toggleModal,
    addSupervisors,
  };
};

export default useDepartmentDetailsForm;
