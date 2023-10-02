import React, { FC } from "react";

const Error = () => (
  <div className="error">
    <h1>
      {/* {{message}} */}
    </h1>
    <h2>
      {/* {{error.status}} */}
    </h2>
    <pre>
      {/* {{error.stack}} */}
    </pre>
  </div>
);

export default Error;
