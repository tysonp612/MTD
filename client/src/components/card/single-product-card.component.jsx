import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tabs } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	HeartOutlined,
	ShoppingCartOutlined,
	StarOutlined,
	CheckOutlined,
	HeartFilled,
} from "@ant-design/icons";
import { CartActionTypes } from "./../../redux/reducers/cart/cart.types";
import techdevices from "./../images/techdevices.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ModalComponent } from "./../../components/modal/modal.component";
import { ProductInfoCard } from "./../card/product-info-card.component";
import { ShowAverage } from "./../rating/average-rating.component";
import StarRatings from "react-star-ratings";

const { TabPane } = Tabs;

export const SingleProduct = ({
	wishList,
	user,
	star,
	handleStarRating,
	product,
	handleAddToWishList,
}) => {
	// Destructure necessary variables from the product object
	const { images, title, description } = product;

	// Initialize Redux hooks
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);

	// Initialize navigation hook
	const navigate = useNavigate();

	// Get parameters from URL
	const param = useParams();

	// Function to add the product to the cart
	const handleAddToCart = () => {
		dispatch({
			type: CartActionTypes.ADD_TO_CART,
			payload: product,
		});
		dispatch({
			type: CartActionTypes.TOGGLE_DRAWER,
		});
	};

	// Function to handle navigation to login page
	const handleHistory = (e) => {
		e.preventDefault();
		navigate({
			pathname: "/login",
			state: { from: `/product/${param.slug}` },
		});
	};

	return (
		<>
			<div className="col-md-7">
				{/* Display product images in a carousel */}
				{images && images.length ? (
					<Carousel showArrows={true} infiniteLoop>
						{images.map((image) => (
							<img src={image.url} key={image.public_id} alt="Product" />
						))}
					</Carousel>
				) : (
					<img
						src={techdevices}
						alt="defalut product"
						style={{ height: "600px", width: "100%", objectFit: "contain" }}
					/>
				)}
				{/* Display product description and additional information tabs */}
				<Tabs type="card">
					<TabPane tab="Description" key="1">
						{description ? description : ""}
					</TabPane>
					<TabPane tab="More" key="2">
						Call us on xxx xxx xxxx to learn more about this product
					</TabPane>
				</Tabs>
			</div>
			<div className="col-md-5">
				{/* Display product title */}
				<h2 className="text-center">{title}</h2>
				{/* Display average rating of the product */}
				{product && product.ratings && product.ratings.length ? (
					<ShowAverage className="pb-4" product={product} />
				) : (
					<div className="text-center pb-3">No ratings yet</div>
				)}

				{/* Display action buttons for cart, wishlist, and rating */}
				<Card
					actions={[
						// Cart action button
						<>
							{/* Check if the product is already in the cart */}
							{cartItems.find((item) => item._id === product._id) ? (
								<Link to={`/cart`}>
									<CheckOutlined disabled={true} />
									<br />
									Item added to cart
								</Link>
							) : // Check if the product is out of stock
							product.quantity === 0 ? (
								<>
									<ShoppingCartOutlined
										disabled={true}
										className="text-warning"
									/>
									<br />
									<p className="text-danger">Out of Stock</p>
								</>
							) : (
								<>
									<ShoppingCartOutlined
										onClick={handleAddToCart}
										className="text-warning"
									/>
									<br />
									Add to cart
								</>
							)}
						</>,
						// Wishlist action button
						<>
							{/* Check if the user is logged in */}
							{!user ? (
								<Link to={`/login`}>
									<HeartOutlined
										className="text-danger"
										onClick={() => handleAddToWishList()}
									/>
									<br />
									Login to add product to Wishlist
								</Link>
							) : // Check if the product is already in the wishlist
							wishList.find((item) => item._id === product._id) ? (
								<Link to={`/user/wishlist`}>
									<HeartFilled className="text-danger" />
									<br />
									Go to Wishlist
								</Link>
							) : (
								<>
									<HeartOutlined
										className="text-danger"
										onClick={() => handleAddToWishList()}
									/>
									<br />
									Add to Wishlist
								</>
							)}
						</>,
						// Rating action button
						<>
							{/* Check if the user is logged in */}
							{user ? (
								<ModalComponent
									button={<StarOutlined className="text-danger" />}
									title="Leave a rating"
									user={user}
									rating={
										<StarRatings
											rating={star}
											starRatedColor="blue"
											changeRating={(e) => handleStarRating(e)}
											numberOfStars={5}
											starHoverColor="blue"
											name="rating"
										/>
									}
								/>
							) : (
								// Prompt user to log in to leave a rating
								<div onClick={(e) => handleHistory(e)}>
									<StarOutlined className="text-danger" />
									<br />
									Log in to leave a rating
								</div>
							)}
						</>,
					]}
				>
					{/* Display product information card */}
					<ProductInfoCard product={product} />
				</Card>
			</div>
		</>
	);
};
