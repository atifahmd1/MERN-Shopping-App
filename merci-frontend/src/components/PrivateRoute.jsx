// src/components/PrivateRoute.js
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);

  console.log("authState: ", authState);

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  return authState.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
