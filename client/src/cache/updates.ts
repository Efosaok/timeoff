import { queryClient } from "../App";
import dot from 'dot-object';

interface CacheUpdateParamsI {
  itemsPath: string;
  dataPath: string;
  queryKey: string;
  data?: Record<string, any>,
  queryId?: number | string,
  replace?: boolean;
}

export const addItemToList = ({
  itemsPath,
  dataPath,
  queryKey,
  data,
  replace,
}: CacheUpdateParamsI) => queryClient.setQueryData(
  queryKey,
  (cacheData: any) => {
    if (!cacheData) return null;

    const newList = replace ? data?.data?.[dataPath] : dot.pick(itemsPath, cacheData?.data)?.concat(data?.data?.[dataPath]);

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
  queryId,
}: CacheUpdateParamsI) => queryClient.setQueryData(
  queryKey,
  (cacheData: any) => {
    if (!cacheData) return null;

    const id = queryId || data?.data?.[dataPath]?.id;
    const newList = dot.pick(itemsPath, cacheData?.data)?.filter((item: Record<string, any>) => item?.id !== Number(id));

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
