import React, { FC } from "react";

interface AllowanceBreakdownI {
  numberOfDaysTakenFromAllowance: number;
  manualAdjustment: number;
  carryOver: number;
  nominalAllowance: number;
  employmentRangeAdjustment: number;
  previous_year: string;
  accruedDays: number;
};

const AllowanceBreakdown: FC<AllowanceBreakdownI> = ({
  numberOfDaysTakenFromAllowance,
  employmentRangeAdjustment,
  nominalAllowance,
  carryOver,
  previous_year,
  manualAdjustment,
  accruedDays,
}) => {
  return (
    <div className="allowance-breakdown">
      <dl>
        <dt>Allowance breakdown
          <i className="fa fa-question-circle"
            data-content="This is explanation how we get the total allowance. Hover on each number to get details what does one mean."
            data-placement="top"
            data-toggle="popover"
            data-trigger="focus hover"
          ></i>
        </dt>
          <dd>
            <em>PTO days per year</em>
            <span className="pull-right"
              data-content="How many PTO days you get each year."
              data-placement="top"
              data-toggle="popover"
              data-trigger="focus hover"
              id='nominalAllowancePart'
            >
              { nominalAllowance }
            </span>
          </dd>
          <dd>
            <em>
              Carried over from {previous_year}
            </em>
            <span className="pull-right"
              data-content="Allowance carried over from previous year. Note: this amount is calculated on the very first day of the year."
              data-placement="top"
              data-toggle="popover"
              data-trigger="focus hover"
              id="allowanceCarriedOverPart"
            >
              { carryOver }
            </span>
          </dd>
          <dd>
            <em>Adjustments</em>
            <span className="pull-right"
              data-content="Adjustment to allowance done by admin user."
              data-placement="top"
              data-toggle="popover"
              data-trigger="focus hover"
            >
              { manualAdjustment }
            </span>
          </dd>
          <dd>
            <em>Start/end of employment</em>
            <span className="pull-right"
              data-content="Automatic adjustment to allowance based on employee's start and end day of employment."
              data-placement="top"
              data-toggle="popover"
              data-trigger="focus hover"
            >
              { employmentRangeAdjustment || 0 }
            </span>
          </dd> 
          <dd>
            <em>Used so far</em>
            <span className="pull-right"
              data-content="Number of days already taken from allowance."
              data-placement="top"
              data-toggle="popover"
              data-trigger="focus hover"
            >
              {/* {{#if_equal user_allowance.number_of_days_taken_from_allowance 0}}{{else}} */}
              {numberOfDaysTakenFromAllowance}
              {/* {{/if_equal}}{{ user_allowance.number_of_days_taken_from_allowance}} */}
            </span>
          </dd>
            <dd>
              <em>Accrued days</em>
              <span className="pull-right"
                data-content="Number of unavailable days in allowance due to accrual nature of vacation entitlement."
                data-placement="top" data-toggle="popover" data-trigger="focus hover">{accruedDays}</span>
            </dd>
      </dl>
    </div>
  );
};

export default AllowanceBreakdown;
