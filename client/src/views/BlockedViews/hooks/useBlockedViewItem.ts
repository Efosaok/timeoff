import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import { removeItemFromList } from "../../../cache/updates";

const useBlockedViewItem = (id: number) => {
  const url = `/settings/blocked-views/${id}`;

  const deleteBlockedViewFn = () => fetchInstance.delete(url);
  const { mutate, isLoading } = useMutation(deleteBlockedViewFn, {
    onSuccess: (data) => {
      toast.success('Blocked view deleted successfully');
      removeItemFromList({
        itemsPath: 'views',
        dataPath: 'viewToRemove',
        queryKey: '/settings/blocked-views',
        data,
      });
    },
    onError: () => {
      toast.error('An error occured, please try again');
    },
  });
  const deleteBlockedView = () => mutate();

  return {
    isLoading,
    deleteBlockedView,
  }
};

export default useBlockedViewItem;
