import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithVerifiedEmail } from "./../../firebase/firebase.utils";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

const CompleteRegister = () => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	let navigate = useNavigate();

	//When app mounted
	useEffect(() => {
		setCredentials({
			...credentials,
			email: window.localStorage.getItem("emailForRegistration"),
		});
	}, [credentials.email]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//1 check if password matches confrimPassword
		if (credentials.password !== credentials.confirmPassword) {
			toast.error(
				`Your password and confirm password does not match, please try again`
			);
		}
		//1.5 Check if password length >= 6
		else if (credentials.password.length < 6) {
			toast.error("Password must have at least 6 characters");
		}
		//2 if password matches, check if email is verified
		else if (
			credentials.password === credentials.confirmPassword &&
			credentials.password.length > 5
		) {
			//check if email is valid
			const verifiedUser = await signInWithVerifiedEmail(
				credentials.email,
				window.location.href //url of the redirect link sent from email
			);
			if (verifiedUser.emailVerified) {
				try {
					const currentUser = auth.currentUser;
					toast.success("Signed in successfully");
					//update password to currentUser
					await updatePassword(currentUser, credentials.password);
					setCredentials({
						email: "",
						password: "",
						confirmPassword: "",
					});
					navigate("/");
				} catch (error) {
					toast.error(error.message);
				}
			}
		}
	};

	return (
		<div className="container p-5">
			<div className="row">
				{/* //row has to be 12 */}
				<div className="col-md-6 offset-md-3">
					<h4>Complete Register </h4>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							className="form-control"
							value={credentials.email}
							disabled
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
						<input
							type="password"
							className="form-control mt-3"
							value={credentials.confrimPassword}
							placeholder="Comfirm Password"
							onChange={(e) =>
								setCredentials({
									...credentials,
									confirmPassword: e.target.value,
								})
							}
						/>
						<button type="submit" className="btn btn-primary mt-3">
							Complete Registration
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CompleteRegister;
