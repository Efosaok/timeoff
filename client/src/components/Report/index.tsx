import React from 'react';
import { Link } from 'react-router-dom';

const Report = () => (
  <div>
    <div className="row">
      <div className="col-md-6 lead">List of available reports</div>
    </div>

    {/* {{> show_flash_messages }} */}

    <div className="row">
      <div className="col-md-4">
        <div className="well well-lg text-center">
          <Link className="btn btn-link btn-lg" to="/reports/allowancebytime/">Allowance usage by time <i className="fa fa-chevron-right" /></Link>
        </div>
      </div>
        <div className="col-md-4">
        <div className="well well-lg text-center">
          <Link className="btn btn-link btn-lg" to="/reports/leaves/">Employees leaves <i className="fa fa-chevron-right"></i></Link>
        </div>
      </div>
    </div>

  </div>
);

export default Report;
