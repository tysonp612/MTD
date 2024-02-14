import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loading-to-redirect/loading-to-redirect";
export const UserRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.user.currentUser);
  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};
