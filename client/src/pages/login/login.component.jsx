import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  logInWithEmailAndPassword,
  logInWithGoogle,
} from "./../../firebase/firebase.utils";
import { toast } from "react-toastify";

const Login = ({ history }) => {
  const stateUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (stateUser) {
      let intended = history.location.state;
      if (intended) {
        history.push(intended.from);
      } else {
        history.push("/");
      }
    }
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();

    //0 Check if email and password
    try {
      const user = await logInWithEmailAndPassword(email, password);
      // const idTokenResult = await user.getIdTokenResult();
      // const userBE = await createOrUpdateUser(idTokenResult);
      // console.log(userBE);
      if (user) {
        setCredentials({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error("Login failed, please try again");
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        {/* //row has to be 12 */}
        <div className="col-md-6 offset-md-3">
          <h4>Login </h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />
            <input
              type="password"
              className="form-control mt-3"
              value={credentials.password}
              placeholder="Password"
              autoFocus
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                })
              }
            />
            <div className="d-grid">
              <button
                type="submit"
                className={
                  !email || password.length < 5
                    ? "btn btn-secondary btn-lg btn-block mt-3"
                    : "btn btn-primary btn-lg btn-block mt-3"
                }
                disabled={!email || password.length < 5 ? true : false}
              >
                Login with Email/Password
              </button>
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block mt-3"
                onClick={logInWithGoogle}
              >
                Login with Google
              </button>
              <div className="d-flex justify-content-end pt-3">
                <Link to={"/forgot/password"} className="text-decoration-none">
                  Forgot Password
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
