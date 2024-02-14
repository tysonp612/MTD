import React, { useEffect, useState } from "react";
import {
	productsCount,
	getSortedProducts,
} from "./../../utils/products/products.utils";
import { LoadingCard } from "./../card/loading-card.component";
import { ProductCard } from "./../card/regular.product-card.component";
import { Pagination } from "antd";

export const BestSellers = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [productsQuantity, setProductsQuantity] = useState(0);
	useEffect(() => {
		loadProducts();
		loadProductsCount();
	}, [page]);
	const loadProducts = async () => {
		setLoading(true);
		await getSortedProducts("sold", "desc", page)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};
	const loadProductsCount = async () => {
		await productsCount()
			.then((res) => {
				setProductsQuantity(res.data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="container">
			{loading ? (
				<LoadingCard count={3} />
			) : (
				<div className="row">
					{products.map((product) => {
						return (
							<div className="col-md-4" key={product._id}>
								<ProductCard product={product} />
							</div>
						);
					})}
					<Pagination
						className="text-center pt-3"
						current={page}
						total={Math.round((productsQuantity / 3) * 10)}
						onChange={(value) => {
							setPage(value);
						}}
					/>
				</div>
			)}
		</div>
	);
};
