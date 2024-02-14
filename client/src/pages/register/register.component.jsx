import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { sendLinkToEmail } from "./../../firebase/firebase.utils";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	});
	const [email, setEmail] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await sendLinkToEmail(email);
			setEmail("");
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div className="container p-5">
			<div className="row">
				{/* //row has to be 12 */}
				<div className="col-md-6 offset-md-3">
					<h4>Register</h4>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							className="form-control"
							value={email}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							autoFocus
						/>
						<button
							type="submit"
							className="btn btn-primary mt-3"
							disabled={!email ? true : false}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
