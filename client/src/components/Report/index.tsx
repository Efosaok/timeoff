import React from 'react';

const Report = () => (
  <div>
    <div className="row">
      <div className="col-md-6 lead">List of available reports</div>
    </div>

    {/* {{> show_flash_messages }} */}

    <div className="row">
      <div className="col-md-4">
        <div className="well well-lg text-center">
          <a className="btn btn-link btn-lg" href="/reports/allowancebytime/">Allowance usage by time <i className="fa fa-chevron-right"></i></a>
        </div>
      </div>
        <div className="col-md-4">
        <div className="well well-lg text-center">
          <a className="btn btn-link btn-lg" href="/reports/leaves/">Employees leaves <i className="fa fa-chevron-right"></i></a>
        </div>
      </div>
    </div>

  </div>
);

export default Report;
