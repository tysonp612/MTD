import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	getOneProduct,
	getRelatedProducts,
	relatedProductsCount,
} from "./../../utils/products/products.utils";
import { addToWishList, getAllWishList } from "./../../utils/user/user.utils";
import { SingleProduct } from "./../../components/card/single-product-card.component";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import { updateStarRating } from "./../../utils/products/products.utils";
import { Pagination } from "antd";
import { toast } from "react-toastify";

export const ProductPage = () => {
	const [product, setProduct] = useState({});
	const [page, setPage] = useState(1);
	const [wishList, setWishList] = useState([]);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [productsQuantity, setProductsQuantity] = useState(0);
	const [star, setStar] = useState();
	const { slug } = useParams();
	const user = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		loadProduct();
		loadWishList();
	}, [slug, page, user]);

	useEffect(() => {
		loadRelatedProduct();
		loadRelatedProductCount();
	}, [product]);

	const loadWishList = async () => {
		try {
			const res = await getAllWishList(user.token);
			setWishList(res.data.wishList);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddToWishList = async () => {
		try {
			await addToWishList(user.token, product._id);
			toast.success("Product added to wish list");
			loadWishList();
		} catch (error) {
			console.log(error);
		}
	};

	const loadProduct = async () => {
		try {
			const res = await getOneProduct(slug);
			setProduct(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const loadRelatedProductCount = async () => {
		try {
			if (product && product.category) {
				const res = await relatedProductsCount(product.category._id);
				setProductsQuantity(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const loadRelatedProduct = async () => {
		try {
			if (product && product.category) {
				const res = await getRelatedProducts(slug, product.category._id, page);
				setRelatedProducts(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleStarRating = async (e) => {
		try {
			setStar(e);
			await updateStarRating(product._id, user.token, e);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row pt-3">
				<SingleProduct
					loadWishList={loadWishList}
					wishList={wishList}
					star={star}
					handleAddToWishList={handleAddToWishList}
					handleStarRating={handleStarRating}
					product={product}
					user={user}
				/>
			</div>
			<div className="row mt-5 text-center">
				<h4 className="text-center pt-3 pb-5 display-7 jumbotron">
					Related Product
				</h4>
				{relatedProducts.map((relatedProduct) => (
					<div className="col-md-4" key={relatedProduct._id}>
						<ProductCard product={relatedProduct} />
					</div>
				))}
				<Pagination
					className="text-center pt-3"
					current={page}
					total={Math.ceil(productsQuantity / 3) * 10}
					onChange={(value) => {
						setPage(value);
					}}
				/>
			</div>
		</div>
	);
};
