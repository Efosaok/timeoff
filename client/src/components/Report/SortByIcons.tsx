import React, { FC } from 'react';

type SortByTypes = 'employeeFullName' | 'departmentName' | 'type' | 'startDate' | 'endDate' | 'status' | 'createdAt' | 'approver';

interface CurrentSortByProps {
  currentSortBy: string,
  sortBy: SortByTypes,
  sortAction: (key: string) => void;
}
const SortByIcons: FC<CurrentSortByProps> = ({
  currentSortBy = '',
  sortBy,
  sortAction,
}) => (
  <>
    {
      currentSortBy === sortBy ?
      (<i className="fa fa-sort-alpha-asc"></i>) : 
      (
        <button className="btn btn-link btn-xs" name="sort_by" type="button" onClick={() => sortAction(`&sort_by=${sortBy}`)}>
          <i className="fa fa-sort-asc"></i>
        </button>
      )
    }
  </>
);

export default SortByIcons;
