import React from "react";

const RequesterAllowance = () => (
  <div className="requester-allowance">
    <p>
      This year
      {/* {{#with requester}}{{this.full_name}}{{/with}} */}
      has taken
      {/* {{~#with requesterAllowance}} {{this.number_of_days_taken_from_allowance}} {{/with~}} */}
      days from holiday allowance. While
      {/* {{#with requesterAllowance}} {{this.number_of_days_available_in_allowance}} */}
      days are still available.
      {/* {{/with}} */}
    </p>
  </div>
);

export default RequesterAllowance;
