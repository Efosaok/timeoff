import React from "react";

const LeaveComments = () => (
  <div className="leave-comments">
    {/* {{# if comments.length }} */}
      {/* {{#each comments}} */}
        <p><strong>Comment:</strong>
        {/* {{this.comment}} */}
        </p>
      {/* {{/each}} */}
    {/* {{/ if }} */}
  </div>
);

export default LeaveComments;
