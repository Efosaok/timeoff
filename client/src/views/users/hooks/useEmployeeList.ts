import classNames from "classnames";
import { useQuery } from "react-query";
import fetchInstance from "../../../axios/fetchInstance";
import useSearchParamsInQuery from "../../../hooks/useSearchParamsInQuery";

const useEmployeeList = () => {
  const { urlWithSearchQuery, params } = useSearchParamsInQuery('/users');
  const { data: employeeList, isLoading } = useQuery(urlWithSearchQuery, () => fetchInstance(urlWithSearchQuery));

  const selectedDepartmentId = params.get('department');
  const allDepartmentClass = classNames(
    'list-group-item',
    {
      'selected-item': !selectedDepartmentId,
    }
  );

  const getDepartmentClass = (id: number) => classNames(
    'list-group-item',
    {
      'selected-item': Number(selectedDepartmentId) === id,
    }
  );

  const downloadAsCSVURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
  const csvpath = `${downloadAsCSVURL}/users/`;

  return {
    employeeList,
    isLoading,
    selectedDepartmentId,
    allDepartmentClass,
    getDepartmentClass,
    csvpath,
  }
};

export default useEmployeeList;
