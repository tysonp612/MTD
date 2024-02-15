import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductFromCategory } from "./../../utils/products/products.utils";
import { ProductCard } from "./../../components/card/regular.product-card.component";

export const CategoriesPage = () => {
	const [products, setProducts] = useState([]);
	const { slug } = useParams();

	useEffect(() => {
		loadProducts();
	}, [slug]); // Reload products when slug changes

	const loadProducts = async () => {
		try {
			const res = await getProductFromCategory(slug); // Using async/await for cleaner code
			setProducts(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container">
			{products && products.length ? (
				<div className="row ">
					<div className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
						{products.length} Products in "{products[0]?.category?.name}"
						category
						{/* Using optional chaining to handle potential undefined category */}
					</div>
					{products.map((product) => (
						<div className="col-md-4" key={product._id}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			) : (
				<div className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
					No products found
				</div>
			)}
		</div>
	);
};
