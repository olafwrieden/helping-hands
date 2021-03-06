import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from ".";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthed } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
