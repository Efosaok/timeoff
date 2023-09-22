import React from "react";
import { Link } from "react-router-dom";

const Import = () => {

  return (
    <div className="user-import">
      <h1>Employees bulk import</h1>

      <div className="row">
        <div className="col-md-6 lead">Quick employees import</div>
        <div className="col-md-6">
          <Link className="btn btn-default pull-right" to="/users/add/" id="add_new_department">Add single employee <i className="fa fa-chevron-right"></i></Link>
        </div>

      </div>

      {/* {{> show_flash_messages }} */}

      <div className="row">
        <div className="col-md-6">
          <ol className="breadcrumb">
            <li><Link to="/users/">All Employees</Link></li>
            <li className="active">Import employees in a bulk</li>
          </ol>
        </div>
      </div>

      <div className="row main-row_header">
        <p className="col-md-12">Do it in three simple steps</p>
      </div>

      <div className="row">
        <div className="col-md-9 col-md-offset-1">

          <form className="form-horizontal" method="POST" action="/users/import-sample/" id="users_import_sample_form">
            <p className="text-bigger">
              <strong>1.</strong> Download example of <strong>.CSV</strong> file based on employees currently available:
              <button
                type  = "submit"
                id    = "users_import_sample_btn"
                className = "btn btn-success"
                data-content   = "The sample file contains information about employees who are already in the system. Extend the file to have records about new employees and upload it using the form on left hand side."
                data-placement = "top"
                data-toggle    = "popover"
                data-trigger   = "focus hover"
              ><i className="fa fa-download"></i> Download <strong>.CSV</strong> sample file</button>
            </p>
          </form>

          <p className="text-bigger">
            <strong>2.</strong> Amend <strong>.CSV</strong> file to contain new employees details.
          </p>

          <p className="text-bigger">
            <strong>3.</strong> Upload <strong>.CSV</strong> file:

            <form action="/users/import/" method="post" encType="multipart/form-data" className="panel-body">
              <div className="form-group">
                <input id="users_input_inp" type="file" name="users_import" />
              </div>
              <div className="form-group">
                  <button className="btn btn-success single-click" id="submit_users_btn" type="submit"><i className="fa fa-upload"></i> Import employees</button>
              </div>
            </form>
          </p>
        </div>
      </div>

      <div className="row">&nbsp;</div>
    </div>
  );
};

export default Import;
