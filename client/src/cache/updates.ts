import { queryClient } from "../App";

interface CacheUpdateParamsI {
  itemsPath: string;
  dataPath: string;
  queryKey: string;
  data: Record<string, any>,
}

export const addItemToList = ({
  itemsPath,
  dataPath,
  queryKey,
  data,
}: CacheUpdateParamsI) => queryClient.setQueryData(
  queryKey,
  (cacheData: any) => {
    if (!cacheData) return null;

    const newList = cacheData?.data?.[itemsPath]?.concat(data?.data?.[dataPath]);

    const newCacheData = {
      ...cacheData,
      data: {
        ...cacheData?.data,
        [itemsPath]: newList,
      },
    };

    return newCacheData;
  },
);

export const removeItemFromList = ({
  itemsPath,
  dataPath,
  queryKey,
  data,
}: CacheUpdateParamsI) => queryClient.setQueryData(
  queryKey,
  (cacheData: any) => {
    if (!cacheData) return null;

    const id = data?.data?.[dataPath]?.id;
    const newList = cacheData?.data?.[itemsPath]?.filter((item: Record<string, any>) => item?.id !== Number(id));

    const newCacheData = {
      ...cacheData,
      data: {
        ...cacheData?.data,
        [itemsPath]: newList,
      },
    };

    return newCacheData;
  },
);
