import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);

  console.log("is login ?", isLogin);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (true) {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;