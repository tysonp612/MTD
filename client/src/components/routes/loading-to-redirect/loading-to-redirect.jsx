// LoadingToRedirect.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

// LoadingToRedirect component is used to create a countdown before redirecting the user
const LoadingToRedirect = () => {
	// State hook for countdown timer, initialized to 5 seconds
	const [count, setCount] = useState(5);
	// useNavigate hook for programmatically navigating to a different route
	const navigate = useNavigate();

	// useEffect hook to handle the countdown logic
	useEffect(() => {
		// Set an interval to decrease the count state by one every 1000 milliseconds (1 second)
		const interval = setInterval(() => {
			setCount((currentCount) => currentCount - 1);
		}, 1000);

		// When count reaches 0, use navigate to redirect to the home route
		count === 0 && navigate("/");

		// Cleanup function to clear the interval when the component is unmounted or count gets to 0
		return () => clearInterval(interval);
	}, [count, navigate]); // Dependencies array, ensures useEffect runs when count or navigate changes

	// JSX to render the countdown message to the user
	return (
		<div className="container p-5 text-center">
			<p>Redirecting you in {count} seconds</p>
		</div>
	);
};

export default LoadingToRedirect; // Export the component for use in other parts of the application
