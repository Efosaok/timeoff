import { Toast, toast } from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useMatches, useNavigate, useParams } from "react-router-dom";
import fetchInstance from "../../axios/fetchInstance";
import useFlash, { UpdateFlashT } from "../../hooks/useFlash";
import { scrollToTop } from "../../utils/helpers";

export interface UserLayoutOutletContextProps {
  res: any;
  updateFlash: UpdateFlashT;
}

const useUserLayoutLoader = () => {
  const { id } = useParams();
  const matches = useMatches();
  const url = `users/edit/${id}`;

  const { messages, errors, updateFlash } = useFlash();
  const { data, isLoading, error } = useQuery(url, () => fetchInstance.get(url));

  const res = data?.data;

  const pathId = matches[matches?.length - 1].id;
  const isOnDetails = pathId === 'details';
  const isOnAbsence = pathId === 'absence';
  const isOnCalendar = pathId === 'u-cal';
  const isOnSchedule = pathId === 'schedule';

  const outletContext = { res, updateFlash };

  const navigate = useNavigate();
  const deleteUserFn = () => fetchInstance.post(`/users/delete/${id}`);
  const { mutate, isLoading: deletingUser } = useMutation(deleteUserFn, {
    onSuccess: (data) => {
      toast.success(data?.data?.messages?.[0]);
      navigate('/users');
    },
    onError: (err: any) => {
      updateFlash(err.response.data.errors, 'errors');
      scrollToTop();
    }
  });
  const deleteUser = () => mutate();

  const toastPromptMessage = `Do you really want to delete the user ${res?.employee?.name} ${res?.employee?.lastname}`;
  const onConfirmToast = (t: Toast) => {
    deleteUser();
    toast.dismiss(t.id);
  };

  return {
    res,
    isOnDetails,
    isOnAbsence,
    isOnCalendar,
    isOnSchedule,
    isLoading,
    error,
    messages,
    errors,
    outletContext,
    deleteUser,
    deletingUser,
    toastPromptMessage,
    onConfirmToast,
  };
};

export default useUserLayoutLoader;
