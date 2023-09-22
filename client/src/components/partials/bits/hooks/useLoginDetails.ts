import { useContext } from "react";
import { useQuery } from "react-query"
import fetchInstance from "../../../../axios/fetchInstance"
import ModalContext from "../../../../contexts/ModalContext";

const useLoginDetails = () => {
  const { data } = useQuery('/login', () => fetchInstance.get('/login'));
  const res = data?.data

  const { toggleShowModal } = useContext(ModalContext)

  return {
    res,
    toggleShowModal,
  }
}

export default useLoginDetails;
