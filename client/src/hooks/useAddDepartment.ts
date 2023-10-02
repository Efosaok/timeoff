import { AxiosResponse } from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import fetchInstance from "../axios/fetchInstance"
import ModalContext from "../contexts/ModalContext";
import { User } from "../interface/res";
import { ADD_DEPARTMENT_INITIALS } from "../utils/constants";
import useInputs from "./useInputs";

const useAddDepartment = (users?: User[]) => {
  const { toggleShowModal } = useContext(ModalContext);

  const { inputs, onChange, clearInputs } = useInputs(ADD_DEPARTMENT_INITIALS);
  const inputsToSend = () => ({
    ...inputs,
    boss_id__new: inputs?.boss_id__new || users?.[0]?.id,
  });
  const addDepartmentFn = () => fetchInstance.post('/settings/departments/', inputsToSend());
  const { mutate, isLoading, data, error } = useMutation<AxiosResponse<any, any>, any, void, unknown>(addDepartmentFn, {
    onSuccess: () => {
      clearInputs();
    }
  });

  const addDepartment = () => mutate();

  const res = data?.data;

  const toggleModal = () => toggleShowModal('addDepartment');

  return {
    toggleModal,
    addDepartment,
    isLoading,
    inputs,
    onChange,
    error,
    res,
  };
};

export default useAddDepartment;
