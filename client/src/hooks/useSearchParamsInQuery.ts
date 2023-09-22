import { useLocation, useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";

interface SearchQueryR {
  urlWithSearchQuery: string;
  params: URLSearchParams;
  search: string;
}
const useSearchParamsInQuery = (url: string): SearchQueryR => {
  const { search } = useLocation();
  const [params] = useSearchParams(search);
  const urlWithSearchQuery = search ? `${url}${search}` : url;

  return {
    urlWithSearchQuery,
    params,
    search,
  }
};

export default useSearchParamsInQuery;
