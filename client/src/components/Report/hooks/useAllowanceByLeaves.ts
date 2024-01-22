import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import fetchInstance from '../../../axios/fetchInstance';
import useSearchParamsInQuery from '../../../hooks/useSearchParamsInQuery';
import getDateRangeValues from '../getDateRangeValues';

interface ReportsByTimeAllowanceFilterParams {
  department: string;
  leaveType?: string;
}
const useAllowanceByLeaves = () => {
  const url = '/reports/leaves';

  const [ filterParams, setFilterParams ] = useState<ReportsByTimeAllowanceFilterParams>({
    department: 'All',
    leaveType: 'All',
  });

  const navigate = useNavigate();

  const { urlWithSearchQuery, params } = useSearchParamsInQuery(url);

  const { data, isLoading, error } = useQuery(
    urlWithSearchQuery,
    () => fetchInstance.get(urlWithSearchQuery),
    {
      keepPreviousData: true,
    }
  );

  const res = data?.data;

  const currentDepartment = params.get('department');
  const currentLeaveType = params.get('leaveType');
  const currentSortBy = params.get('sort_by') as any;

  const csvActionPath = process.env.NODE_ENV === 'development' ? `http://localhost:3000${url}` : '';

  const updateFilterParams = (key: keyof ReportsByTimeAllowanceFilterParams, value: string) =>
    setFilterParams({ ...filterParams, [key]: value })

  const generateUrlWithQueryParams = () => {
    const { datesStringified } = getDateRangeValues();
    const params = `department=${filterParams?.department}&${datesStringified}&leaveType=${filterParams?.leaveType}`;
    const urlWithParams = `${url}?${params}`;
    return urlWithParams;
  }

  const filterResults = (addtionalParams?: string) => {
    let urlWithParams = generateUrlWithQueryParams();
    if (addtionalParams) urlWithParams += addtionalParams;
    navigate(urlWithParams);
  }

  return {
    res,
    isLoading,
    error,
    currentDepartment,
    updateFilterParams,
    filterResults,
    csvActionPath,
    currentLeaveType,
    currentSortBy,
  };
};

export default useAllowanceByLeaves;
