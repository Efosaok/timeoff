import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom";
import fetchInstance from "../../../../axios/fetchInstance"
import ModalContext from "../../../../contexts/ModalContext";

const useLoginDetails = () => {
  const { data } = useQuery('/login', () => fetchInstance.get('/login'));
  const res = data?.data
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { toggleShowModal } = useContext(ModalContext)

  const toggleModal = () => toggleShowModal();

  const logoutFn = () => fetchInstance.get('/logout');
  const { mutate } = useMutation(logoutFn, {
    onSuccess: () => {
      toast.success('Logout succesful');
      navigate('/');
      queryClient.invalidateQueries('/login');
    },
  })
  const logout = () => mutate();

  return {
    res,
    toggleModal,
    logout
  }
}

export default useLoginDetails;
