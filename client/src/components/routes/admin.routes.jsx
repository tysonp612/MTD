import React, { useEffect, useState } from "react";
import { adminCheckResult } from "./../../utils/authentication/authentication.utils";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loading-to-redirect/loading-to-redirect";

export const AdminRoute = ({ children }) => {
	// Initialize state to track if the user is authorized
	const [isAuthorized, setIsAuthorized] = useState(false);

	// Get current user from Redux state
	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		const checkAdminStatus = async () => {
			try {
				// Check if user is logged in and is an admin
				if (user) {
					const admin = await adminCheckResult(user.token);
					setIsAuthorized(admin);
				} else {
					setIsAuthorized(false);
				}
			} catch (error) {
				console.error("Error checking admin status:", error);
				setIsAuthorized(false);
			}
		};

		checkAdminStatus();
	}, [user]);

	// Render children if user is authorized, otherwise render loading component
	return isAuthorized ? children : <LoadingToRedirect />;
};
