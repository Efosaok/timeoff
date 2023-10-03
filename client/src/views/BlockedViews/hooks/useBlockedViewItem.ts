import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";

const useBlockedViewItem = (id: number) => {
  const url = `/settings/blocked-views/${id}`;
  const queryClient = useQueryClient();

  const deleteBlockedViewFn = () => fetchInstance.delete(url);
  const { mutate, isLoading } = useMutation(deleteBlockedViewFn, {
    onSuccess: (newData) => {
      toast.success('Blocked view deleted successfully');
      queryClient.setQueryData('/settings/blocked-views', (cacheData: any) => {
        const viewsList = cacheData?.data?.views?.filter((view: any) => view?.id !== Number(newData?.data?.viewToRemove?.id));
        const newCacheData = {
          ...cacheData,
          data: {
            ...cacheData?.data,
            views: viewsList,
          },
        };

        return newCacheData;
      });
    },
  });
  const deleteBlockedView = () => mutate();

  return {
    isLoading,
    deleteBlockedView,
  }
};

export default useBlockedViewItem;
