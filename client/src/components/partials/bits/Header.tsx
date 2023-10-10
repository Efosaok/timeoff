import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import BookLeave from "../modals/BookLeave";
import useLoginDetails from "./hooks/useLoginDetails";

const Header = () => {
  const { res, toggleModal, logout, notifRes } = useLoginDetails();

  const notificationBadgeClasses = classNames(
    'label label-info notification-badge',
    { hidden: !notifRes?.data?.length }
  );

  return (
    <div className="header">

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Rocco's Collision PTO</Link>
          </div>

          {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-left">
              {res?.loggedUser ? 
                (<>
                  <li>
                    <Link to="/calendar/">Calendar</Link></li>
                    {!res?.keepTeamViewHidden ? (<li><Link to="/teamview/">Team View</Link></li>) : null}
                    {res?.loggedUser.admin ? (<li className="hidden-xs"><Link to="/users/">Employees</Link></li>) : null}
                    <li className="navbar-form navbar-left">
                      <div className="form-group">
                    <button onClick={toggleModal} type="button" className="btn btn-info" id="book_time_off_btn">New absence</button>
                  </div>
                </li>
                </>) : null
              }
            </ul>
            <ul className="nav navbar-nav navbar-right">
                {res?.loggedUser ? (
                  <>
                    <li className="dropdown" id="header-notification-dropdown">
                      <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                        <span className="fa fa-bell-o"></span>
                        <span className={notificationBadgeClasses}>{notifRes?.data?.length}</span>
                      </Link>
                      <ul className="dropdown-menu" role="menu">
                        {notifRes?.data?.length ? (
                          <>
                            {notifRes?.data?.map((notif: any) => (
                              <li>
                                <Link to="/requests">{notif?.label}</Link>
                              </li>
                            ))}
                          </>
                        ): (<li className="dropdown-header">No notifications</li>)}
                      </ul>
                    </li>
                    {res?.loggedUser?.admin ? (
                      <li className="dropdown hidden-xs">
                        <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span className="fa fa-gears"></span> <span className="caret"></span></Link>
                        <ul className="dropdown-menu" role="menu">
                          <li><Link to="/settings">General</Link></li>
                          <li role="separator" className="divider"></li>
                          <li><Link to="/departments/">Departments</Link></li>
                          <li><Link to="/bankholidays/">Bank Holidays</Link></li>
                          <li><Link to="/blocked-views">Blocked Views</Link></li>
                          <li><Link to="/authentication/">LDAP configuration</Link></li>
                          <li><Link to="/integration-api/">API configuration</Link></li>
                          <li><Link to="/users/import/">Import employees</Link></li>
                          <li role="separator" className="divider"></li>
                          <li><Link to="/audit/email/">Emails audit</Link></li>
                          {/* <li><Link to="/reports/">Reports</Link></li> */}
                        </ul>
                      </li>
                    ) : null}
                    <li className="visible-xs-block"><Link to="/requests/">Requests</Link></li>
                    <li className="visible-xs-block"><Link to="/logout/">Logout</Link></li>
                    <li className="dropdown hidden-xs">
                      <Link id="me_menu" to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Me <span className="caret"></span></Link>
                      <ul className="dropdown-menu" role="menu">
                        <li><Link to="/requests/">Requests</Link></li>
                        <li className="hidden-xs"><Link to="/feeds/">Feeds</Link></li>
                        <li role="separator" className="divider hidden-xs"></li>
                        <li><Link to="#" onClick={logout}>Logout</Link></li>
                      </ul>
                    </li>
                  </>
                ) : <li><Link to="/login/">Login</Link></li>
                }
            </ul>
          </div>
        </div>
      </nav>

      {/* {{# if logged_user }} */}
        {/* {{# if logged_user.company.company_wide_message  }} */}
          {/* <div className="alert alert-danger" role="alert"> */}
            {/* {{ logged_user.company.company_wide_message }} */}
            {/* </div> */}
        {/* {{/if}} */}
      {/* {{/if}} */}

      <BookLeave />

    </div>
  );
};

export default Header;
