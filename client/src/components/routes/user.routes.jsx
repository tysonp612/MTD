// UserRoute.js
import React from "react";
import { useSelector } from "react-redux"; // Hook to access the Redux store state
import { Navigate, useLocation } from "react-router-dom"; // Components from React Router v6 for navigation and location handling

// UserRoute is a wrapper component that takes children components as props
export const UserRoute = ({ children }) => {
	// Access the current user from the Redux store
	const user = useSelector((state) => state.user.currentUser);
	// useLocation hook to get the current location (used for redirecting after login if necessary)
	const location = useLocation();

	// Conditional rendering based on the user's authentication status
	// If the user is authenticated (checked by the presence of user.token), it renders the children components
	// If the user is not authenticated, it redirects to the login page using the Navigate component
	// The state prop in Navigate is used to pass the current location to the login page,
	// which allows the application to redirect back to the original page after successful login
	if (user && user.token) {
		return children;
	} else {
		<Navigate to="/login" state={{ from: location }} replace />;
	}
};
