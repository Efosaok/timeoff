import { useContext } from "react";
import { useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import ModalContext from "../../../contexts/ModalContext";

const useDepartmentsOverview = () => {
  const url = '/settings/departments';
  const { data, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const { toggleShowModal } = useContext(ModalContext);

  const res = data?.data;

  const toggleModal = () => toggleShowModal('addDepartment');

  return {
    res,
    isLoading,
    toggleModal,
  };
};

export default useDepartmentsOverview;