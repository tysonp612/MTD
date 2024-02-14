import React from "react";

export const UpdateCategoryForm = ({ slug, handleUpdate, input, setInput }) => {
	const [first, ...rest] = slug.split("");
	const newSlug = [first.toUpperCase(), ...rest].join("");
	return (
		<form onSubmit={handleUpdate}>
			<label>{`Update ${newSlug} `}</label>
			<input
				type="text"
				className="form-control"
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
			/>
			<button
				className="btn btn-outline-primary mt-3"
				disabled={input.length < 2 || input.length > 36 ? true : false}
			>
				Update
			</button>
		</form>
	);
};

export const CreateCategoryForm = ({ handleCreate, name, setName }) => {
	return (
		<form onSubmit={handleCreate}>
			<label>Name</label>
			<input
				type="text"
				className="form-control"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<button className="btn btn-outline-primary mt-3">Save</button>
		</form>
	);
};
