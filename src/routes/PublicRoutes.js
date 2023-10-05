import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PublicRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate replace to="/" /> : <Outlet />;
};

export default PublicRoutes;
