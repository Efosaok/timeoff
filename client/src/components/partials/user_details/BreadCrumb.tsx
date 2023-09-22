import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ employee }: any) => (
  <ol className="breadcrumb">
    <li><Link to="/users/">All Employees</Link></li>
    <li className="active">
      {employee?.name} { employee?.lastname}
    </li>
  </ol>
);

export default BreadCrumb;
