import React, { useState } from "react";
import UserNav from "../../components/navigation/user-navigation.component";
import { auth } from "./../../firebase/firebase.utils";
import { updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
const Password = () => {
	const [credentials, setCredentials] = useState({
		password: "",
		confirmPassword: "",
	});
	const changePassword = async (e) => {
		try {
			e.preventDefault();
			const currentUser = auth.currentUser;
			await updatePassword(currentUser, credentials.password);
			toast.success("Password updated successfully");
			setCredentials({
				password: "",
				confirmPassword: "",
			});
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col-md-10">
					<div className="container p-5">
						<div className="row">
							<div className="col-md-6 offset-md-3">
								<h4>Change Password</h4>
								<form onSubmit={changePassword}>
									<input
										type="password"
										className="form-control"
										value={credentials.password}
										onChange={(e) =>
											setCredentials({
												...credentials,
												password: e.target.value,
											})
										}
										placeholder="New Password"
									/>
									<input
										type="password"
										className="form-control mt-3"
										value={credentials.confirmPassword}
										onChange={(e) =>
											setCredentials({
												...credentials,
												confirmPassword: e.target.value,
											})
										}
										placeholder="Confirm Password"
									/>

									<div className="d-grid">
										<button
											disabled={
												credentials.password.length >= 6 &&
												credentials.password === credentials.confirmPassword
													? false
													: true
											}
											className="btn btn-primary btn-lg btn-block mt-3"
										>
											Reset password
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Password;
