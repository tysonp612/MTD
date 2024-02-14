import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	logInWithEmailAndPassword,
	logInWithGoogle,
} from "./../../firebase/firebase.utils";
import { createOrUpdateUser } from "./../../utils/authentication/authentication.utils";
import { toast } from "react-toastify";

const Login = () => {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const { email, password } = credentials;

	//FOR LOG IN, when use fire base bult in functions for loginWithEmailAndPassword and loginWithGoogle, the auth listener will listen to auth token change, then trigger the dispatch and send back token from FE to BE for verification
	const credentialsLogin = async (e) => {
		e.preventDefault();

		try {
			//0 Check if email and password is valid and login using firebase
			const user = await logInWithEmailAndPassword(email, password)
				.then(() => {
					setCredentials({
						email: "",
						password: "",
					});
					// You might want to navigate the user or do some other action here
					navigate("/");
				})
				.catch((err) => {
					toast.error("Login failed, please try again");
				});
		} catch (error) {
			toast.error("Login failed, please try again");
		}
	};

	const googleLogin = async (e) => {
		e.preventDefault();
		try {
			//0 Check if email and password is valid and login using firebase
			const user = await logInWithGoogle()
				.then(() => {
					setCredentials({
						email: "",
						password: "",
					});
					// You might want to navigate the user or do some other action here
					navigate("/");
				})
				.catch((err) => {
					toast.error("Login failed, please try again");
				});
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
					<form onSubmit={credentialsLogin}>
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
								onClick={(e) => googleLogin(e)}
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
