import React, { useState } from "react";
import { SearchQueryActionTypes } from "./../../redux/reducers/search-query/search-query.types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

export const QuerySearchForm = () => {
	const [text, setText] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate(); // useNavigate hook to programmatically navigate

	// handleInput is called every time the input changes
	const handleInput = (e) => {
		const value = e.target.value;
		setText(value);
		// Dispatch an action to update the search query in the Redux store
		dispatch({
			type: SearchQueryActionTypes.SEARCH_QUERY,
			payload: value,
		});
	};

	// handleSubmit is called when the form is submitted
	const handleSubmit = (e) => {
		e.preventDefault();
		// Use navigate to change the URL, which will trigger navigation to the search results page
		navigate(`/shop?${text}`);
	};

	// The form element with an input for the search query
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input
				placeholder="Search product"
				className="form-control"
				type="text"
				value={text} // Set the input value to the 'text' state
				onChange={(e) => handleInput(e)} // Set the input change handler
			></input>
		</form>
	);
};

//Note
//Note why use redux instead of useState
// When using history.push() in Search component, why are we using "?"

// history.push(`/shop?${text}`);
// Can we not pass the string like we normally do with a slash (/)

// history.push(`/shop/${text}`);
// and then grab the param out of the URL?

// That's the standard way of pushing queries to url using ?

// If you use / that will be treated as different url
