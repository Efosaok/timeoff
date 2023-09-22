const getUserAllowanceMeta = (allowance) => ({
  numberOfDaysAvailableInAllowance: allowance.number_of_days_available_in_allowance,
  totalNumberOfDaysInAllowance: allowance.total_number_of_days_in_allowance,
  nominalAllowance: allowance.nominal_allowance,
  carryOver: allowance.carry_over,
  manualAdjustment: allowance.manual_adjustment,
  employmentRangeAdjustment: allowance.employement_range_adjustment,
  numberOfDaysTakenFromAllowance: allowance.number_of_days_taken_from_allowance,
  isAccruedAllowance: allowance.is_accrued_allowance,
  accruedDays: allowance.accrued_adjustment2,
});

module.exports = getUserAllowanceMeta;
