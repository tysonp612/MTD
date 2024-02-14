import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubCategories } from "../../utils/sub-category/sub-category.utils";
export const HomePageSubCategory = () => {
	const [subcategories, setSubCategories] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		loadCategories();
	}, []);
	const loadCategories = async () => {
		await getSubCategories()
			.then((res) => setSubCategories(res.data))
			.catch((err) => console.log(err));
	};
	return (
		<div className="row justify-content-center ">
			{subcategories &&
				subcategories.map((sub) => {
					return (
						<button
							key={sub._id}
							className="btn btn-secondary pt-3 pb-3 m-2 col-md-3 w-10"
							onClick={() => navigate(`/sub-category/${sub.slug}`)}
						>
							{sub.name}
						</button>
					);
				})}
		</div>
	);
};
