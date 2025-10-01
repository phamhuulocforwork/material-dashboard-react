import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  // FIXME: API lỗi nên tạm thời bỏ
  // if (!isAuthenticated()) {
  //   return <Navigate to="/authentication/sign-in" replace />;
  // }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
