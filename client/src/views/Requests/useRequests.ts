import { useContext, useState } from "react";
import { useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";
import ModalContext from "../../contexts/ModalContext";
import useFlash from "../../hooks/useFlash";
import useSearchParamsInQuery from "../../hooks/useSearchParamsInQuery";

const useRequests = () => {
  const { urlWithSearchQuery } = useSearchParamsInQuery('/requests');
  const { data, error, isLoading } = useQuery(urlWithSearchQuery, () => fetchInstance.get(urlWithSearchQuery));

  const res = data?.data;
  const { messages, errors, updateFlash } = useFlash();

  const [selectedLeave, setSelectedLeave] = useState({});
  const { toggleShowModal } = useContext(ModalContext);
  const toggleModal = (leave: Record<string, any>) => {
    setSelectedLeave(leave);
    toggleShowModal('handleRequest');
  }

  return {
    error,
    res,
    isLoading,
    toggleModal,
    selectedLeave,
    messages,
    errors,
    updateFlash,
  }
};

export default useRequests;
