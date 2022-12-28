import React from "react";
import { Redirect, withRouter, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem("loginToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default withRouter(ProtectedRoute);
