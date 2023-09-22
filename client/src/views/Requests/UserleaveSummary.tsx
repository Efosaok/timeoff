import React, { FC } from "react";
import { useQuery } from "react-query";
import fetchInstance from "../../axios/fetchInstance";

interface UserLeaveSummaryProps {
  userId: number;
}

const useUserSummary = (userId: number) => {
  const url = `/users/summary/${userId}`;
  const { data: summaryData, isLoading } = useQuery(url, () => fetchInstance.get(url));

  const accruedDays = summaryData?.data?.userAllowance?._carry_over -
    summaryData?.data?.userAllowance?._number_of_days_taken_from_allowance;

  const totalAllowance = summaryData?.data?.userAllowance?._carry_over;

  return {
    isLoading,
    accruedDays,
    totalAllowance,
  }
};

const UserLeaveSummary: FC<UserLeaveSummaryProps> = ({ userId }) => {
  const { isLoading, accruedDays, totalAllowance } = useUserSummary(userId);

  return (
    <div className="leave-summary">
      {isLoading ? 'Loading...' : (
      <div>
        <strong>Available:</strong>
        {' '}
        {accruedDays} ({accruedDays} accrued)
        {' '}
        days out of {totalAllowance}.
      </div>
      )}
    </div>
  );
};

export default UserLeaveSummary;
