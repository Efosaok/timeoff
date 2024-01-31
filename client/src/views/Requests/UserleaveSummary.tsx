import React, { FC } from "react";
import { useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";

interface UserLeaveSummaryProps {
  userId: number;
}

const useUserSummary = (userId: number) => {
  const url = `/users/summary/${userId}`;
  const { data: summaryData, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const totalAllowance = summaryData?.data?.allowanceMeta?.accruedDays;

  const numberOfDaysAvailableInAllowance = summaryData?.data?.allowanceMeta?.numberOfDaysAvailableInAllowance;

  return {
    isLoading,
    totalAllowance,
    numberOfDaysAvailableInAllowance,
  }
};

const UserLeaveSummary: FC<UserLeaveSummaryProps> = ({ userId }) => {
  const { isLoading, numberOfDaysAvailableInAllowance, totalAllowance } = useUserSummary(userId);

  return (
    <div className="leave-summary">
      {isLoading ? 'Loading...' : (
      <div>
        <strong>Available:</strong>
        {' '}
        {numberOfDaysAvailableInAllowance}(accrued)
        {' '}
        days out of {totalAllowance}.
      </div>
      )}
    </div>
  );
};

export default UserLeaveSummary;
