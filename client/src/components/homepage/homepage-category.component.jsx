import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "./../../utils/category/category.utils";
export const HomePageCategory = () => {
	const [categories, setCategories] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		loadCategories();
	}, []);
	const loadCategories = async () => {
		await getCategories()
			.then((res) => setCategories(res.data))
			.catch((err) => console.log(err));
	};
	return (
		<div className="row justify-content-center ">
			{categories &&
				categories.map((cat) => {
					return (
						<button
							key={cat._id}
							className="btn btn-secondary pt-3 pb-3 m-2 col-md-3 w-10"
							onClick={() => navigate(`/category/${cat.slug}`)}
						>
							{cat.name}
						</button>
					);
				})}
		</div>
	);
};