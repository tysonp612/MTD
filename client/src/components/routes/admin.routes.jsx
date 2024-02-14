import React, { useEffect, useState } from "react";
import { adminCheckResult } from "./../../utils/authentication/authentication.utils";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loading-to-redirect/loading-to-redirect";

export const AdminRoute = ({ ...rest }) => {
  const [ok, setOk] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(async () => {
    if (user) {
      await adminCheckResult(user.token)
        .then((admin) => {
          return setOk(true);
        })
        .catch((error) => console.log(error));
    } else {
      return setOk(false);
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};
