import React, { useState } from "react";
import { forgotPasswordEmail } from "../../firebase/firebase.utils";
import { toast } from "react-toastify";

const ForgotPassword = ({ history }) => {
	const [credentials, setCredentials] = useState({
		email: "",
	});

	const handleSendPasswordResetEmail = async (e) => {
		const { email } = credentials;
		console.log(email);
		e.preventDefault();
		if (email) {
			try {
				await forgotPasswordEmail(email);
				toast(`Password reset email has been sent to ${email}`);
				setCredentials({
					...credentials,
					email: "",
				});
			} catch (error) {
				toast.error("Reset password email could not be sent, please try again");
			}
		} else {
			toast.error("Please enter email to begin process");
		}
	};
	return (
		<div className="container p-5">
			<div className="row">
				{/* //row has to be 12 */}
				<div className="col-md-6 offset-md-3">
					<h4>Forgot Password</h4>
					<form onSubmit={handleSendPasswordResetEmail}>
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

						<div className="d-grid">
							<button
								type="submit"
								className="btn btn-primary btn-lg btn-block mt-3"
							>
								Send password reset email
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
