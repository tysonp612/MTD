import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
	console.log(authToken);
	//the empty {} is the body that we need to send to BE, the second {} is for header
	return await axios.post(
		`${process.env.REACT_APP_API}/create-or-update-user`,
		{},
		{ headers: { authToken: authToken } }
	);
};

export const adminCheckResult = async (authToken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/admin-route`,
		{},
		{ headers: { authToken: authToken } }
	);
};

export const roleBasedRedirect = (userRole, history) => {
	if (userRole === "admin") {
		history.push("/admin/dashboard");
	} else if (userRole === "subcriber") {
		history.push("/user/history");
	}
};
