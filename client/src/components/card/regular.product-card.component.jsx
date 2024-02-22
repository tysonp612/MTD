// Importing necessary modules and components from React, Redux, Ant Design, utilities, and other dependencies.
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import {
	EyeOutlined,
	ShoppingCartOutlined,
	CheckOutlined,
	DeleteOutlined,
	HeartOutlined,
	HeartFilled,
} from "@ant-design/icons";
import productsDefaultImages from "./../images/techdevices.jpeg";
import { ShowAverage } from "./../rating/average-rating.component";
import { CartActionTypes } from "../../redux/reducers/cart/cart.types";
import { addToWishList, getAllWishList } from "./../../utils/user/user.utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Define the ProductCard component with props for product data and wish list handling.
export const ProductCard = ({ product, okay, handleRemoveWishList }) => {
	const [wishList, setWishList] = useState([]);

	// Load the wish list for the current user.
	useEffect(() => {
		loadWishList();
	}, [product]);

	const handleAddToWishList = async () => {
		try {
			await addToWishList(user.token, product._id);
			toast.success("Product added to wish list");
			loadWishList();
		} catch (error) {
			console.error(error);
		}
	};

	const loadWishList = async () => {
		try {
			const res = await getAllWishList(user.token);
			setWishList(res.data.wishList);
		} catch (error) {
			console.error(error);
		}
	};

	// Destructuring for cleaner access to product properties.
	const { title, description, images, slug, ratings } = product;

	// Accessing Redux store state.
	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);
	const { Meta } = Card;

	// Adds the product to the cart using Redux action.
	const handleAddToCart = () => {
		dispatch({
			type: CartActionTypes.ADD_TO_CART,
			payload: product,
		});
		dispatch({
			type: CartActionTypes.TOGGLE_DRAWER,
		});
	};

	// Checks if the item is already in the cart or out of stock.
	const checkItemInCart = () => {
		const itemInCart = cartItems.find(
			(cartItem) => cartItem._id === product._id
		);
		if (itemInCart) {
			return (
				<Link to={`/cart`}>
					<CheckOutlined disabled={true} />
					<br />
					Item added to cart
				</Link>
			);
		} else if (product.quantity === 0) {
			return (
				<>
					<ShoppingCartOutlined disabled={true} />
					<p className="text-danger">Out of Stock</p>
				</>
			);
		} else {
			return <ShoppingCartOutlined onClick={handleAddToCart} />;
		}
	};

	// Render product card with conditionally displayed actions based on product state and user login.
	return (
		<>
			{ratings && ratings.length ? (
				<ShowAverage product={product} />
			) : (
				<div className="text-center pb-3">No rating yet</div>
			)}

			<Card
				cover={
					<img
						style={{ height: "250px", objectFit: "contain" }}
						className="p-1"
						src={
							images && images.length ? images[0].url : productsDefaultImages
						}
						alt={title} // Adding alt text for accessibility.
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined className="text-warning" />
					</Link>,
					<>{checkItemInCart()}</>,
					<>
						{user ? (
							okay ? (
								<DeleteOutlined
									className="text-danger"
									onClick={() => handleRemoveWishList(product._id)}
								/>
							) : wishList.find((item) => item._id === product._id) ? (
								<Link to={`/user/wishlist`}>
									<HeartFilled className="text-danger" />
									<br />
									Go to Wishlist
								</Link>
							) : (
								<HeartOutlined
									className="text-danger"
									onClick={() => handleAddToWishList()}
								/>
							)
						) : (
							<Link to={`/login`}>
								<HeartOutlined className="text-danger" />
								<br />
								Login to add product to Wishlist
							</Link>
						)}
					</>,
				]}
			>
				<Meta
					title={title}
					description={`${description && description.substring(0, 40)}...`}
				/>
			</Card>
		</>
	);
};
