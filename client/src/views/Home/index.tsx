import React from "react";

const Home = () => (
  <div className="home">
    <div className="jumbotron">
      <h1>TimeOff management</h1>
      <p className="lead">Open source Staff Time off management for companies of all sizes.</p>
      <p><a className="btn btn-lg btn-success" href="/register/" role="button">Sign up now</a></p>
      <p>or fork us on <a href="https://github.com/vpp/vacation-tracker">GitHub</a></p>
      </div>

      <div className="row marketing">


      <div className="col-lg-6">
        <h4>Company Departments</h4>
        <p>Create departments to group employees, each one has its own manager.</p>

        <h4>Customised Leave Types</h4>
        <p>Holidays, Sickness, Maternity, Paternity, Working from home etc. In addition configure whether a type uses vacation allowance or not.</p>

        <h4>Calendar Integration</h4>
        <p>Broadcast employees whereabout into calendars: Outlook, Gmail. (Work in progess)</p>
      </div>

      <div className="col-lg-6">
        <h4>Customised Public holidays</h4>
        <p>Setup public holidays as well as company specific dates.</p>

        <h4>Simple Workflow</h4>
        <p>Employee requests a leave, manager says yes or no.</p>

        <p></p>
      </div>
      </div>

  </div>
);

export default Home;
