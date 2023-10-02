import { useContext } from "react";
import { useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import ModalContext from "../../../contexts/ModalContext";

const useBlockViews = () => {
  const url = '/settings/blocked-views';

  const fetchBlockViewsFn = () => fetchInstance(url);
  const { isLoading, data } = useQuery(url, fetchBlockViewsFn);

  const res = data?.data;

  const { toggleShowModal } = useContext(ModalContext);
  const toggleModal = () => toggleShowModal('addBlockedView');

  return {
    res,
    isLoading,
    toggleModal,
  };
};

export default useBlockViews;
