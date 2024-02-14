// import React, { useState } from "react";
// import { SearchQueryActionTypes } from "./../../redux/reducers/search-query/search-query.types";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// export const QuerySearchForm = () => {
// 	const [text, setText] = useState("");
// 	const dispatch = useDispatch();
// 	const history = useHistory();
// 	const handleInput = (e) => {
// 		setText(e.target.value);
// 		dispatch({
// 			type: SearchQueryActionTypes.SEARCH_QUERY,
// 			payload: e.target.value,
// 		});
// 	};
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		history.push(`/shop?${text}`);
// 	};
// 	return (
// 		<form onSubmit={(e) => handleSubmit(e)}>
// 			<input
// 				placeholder="Search product"
// 				className="form-control"
// 				type="text"
// 				onChange={(e) => handleInput(e)}
// 			></input>
// 		</form>
// 	);
// };

// //Note
// //Note why use redux instead of useState
// // When using history.push() in Search component, why are we using "?"

// // history.push(`/shop?${text}`);
// // Can we not pass the string like we normally do with a slash (/)

// // history.push(`/shop/${text}`);
// // and then grab the param out of the URL?

// // That's the standard way of pushing queries to url using ?

// // If you use / that will be treated as different url
