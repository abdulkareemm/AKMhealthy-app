import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = (props) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
};

export default PublicRoutes;
