import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./components/layouts/User";
import Absences from "./components/partials/user_details/Absences";
import Schedule from "./components/partials/user_details/Schedule";
import Login from "./views/Auth/Login";
import Calendar from "./views/Calendar";
import Overview from "./views/departments/Overview";
import FeedsList from "./views/FeedsList";
import Home from "./views/Home";
import Requests from "./views/Requests";
import CompanyAuthentication from "./views/settings/CompanyAuthentication";
import CompanyIntegration from "./views/settings/CompanyIntegration";
import GeneralSettings from "./views/settings/General";
import DepartmentDetails from './views/departments/Details'
import UserGeneralDetails from './components/partials/user_details/General';
import TeamView from "./views/TeamView";
import Add from "./views/users/Add";
import Import from "./views/users/Import";
import Users from "./views/users/Users";
import UserCalendar from './components/partials/user_details/Calendar';
import Emails from "./components/audit/Emails";
import Root from "./components/layouts/Root";
import BankHolidays from "./views/BankHolidays";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/teamview',
        element: <TeamView />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/import',
        element: <Import />
      },
      {
        path: '/users/add',
        element: <Add />,
      },
      {
        path: '/user',
        element: <User />,
        children: [
          {
            path: '/user/:id',
            element: <UserGeneralDetails />,
            id: 'details',
          },
          {
            path: '/user/:id/absences',
            element: <Absences />,
            id: 'absence',
          },
          {
            path: '/user/:id/schedule',
            element: <Schedule />,
            id: 'schedule',
          },
          {
            path: '/user/:id/calendar',
            element: <UserCalendar />,
            id: 'u-cal',
          }
        ]
      },
      {
        path: '/requests',
        element: <Requests />,
      },
      {
        path: '/feeds',
        element: <FeedsList />
      },
      {
        path: '/settings',
        element: <GeneralSettings />
      },
      {
        path: '/bankholidays',
        element: <BankHolidays />
      },
      {
        path: '/departments',
        element: <Overview />,
      },
      {
        path: '/departments/:id',
        element: <DepartmentDetails />
      },
      {
        path: '/authentication',
        element: <CompanyAuthentication />
      },
      {
        path: '/integration-api/',
        element: <CompanyIntegration />
      },
      {
        path: '/audit/email',
        element: <Emails />,
      },
    ],
  },
]);

const Router = () => (
  <RouterProvider router={routes} />
);

export default Router;
