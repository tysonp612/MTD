import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import productsDefaultImages from "./../../components/images/techdevices.jpeg";
import { CartActionTypes } from "./../../redux/reducers/cart/cart.types";
import { updateCart } from "./../../utils/user/user.utils";

export const CartPage = () => {
	const [summaryDetail, setSummaryDetail] = useState();
	const [totalPrice, setTotalPrice] = useState();
	const [colors, setColors] = useState([
		"Black",
		"Silver",
		"White",
		"Blue",
		"Dark Grey",
	]);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		calculateSingleItemPrice();
		calculateTotalPrice();
	}, [cartItems]);

	const saveCartToDatabase = async () => {
		//in this step,store and then get data from backend to avoid user changing data like price
		const authToken = user.token;

		await updateCart(cartItems, authToken)
			.then((res) => {
				console.log(res);
				navigate("/checkout");
			})
			.catch((err) => console.log(err));
	};
	const handleIncreaseCartItem = (item) => {
		dispatch({ type: CartActionTypes.ADD_TO_CART, payload: item });
		if (item.cartQuantity === item.quantity) {
			toast.error(`Maximum available quantity: ${item.quantity}`);
		}
	};
	const handleDecreaseCartItem = (item) => {
		dispatch({ type: CartActionTypes.REMOVE_FROM_CART, payload: item });
	};
	const handleDeleteCartItem = (item) => {
		dispatch({ type: CartActionTypes.DELETE_FROM_CART, payload: item });
	};
	const handleNavigate = (e) => {
		e.preventDefault();
		navigate({
			pathname: "/login",
			state: { from: `/cart` },
		});
	};
	const changeCartItemColor = (item, color) => {
		dispatch({
			type: CartActionTypes.CHANGE_PRODUCT_COLOR,
			payload: { item, color },
		});
	};
	const calculateTotalPrice = () => {
		if (cartItems.length) {
			const total = cartItems
				.map((cartItem) => cartItem.cartQuantity * cartItem.price)
				.reduce(
					(accumulatedPrice, singleProductPrice) =>
						accumulatedPrice + singleProductPrice,
					0
				);
			return setTotalPrice(total);
		}
	};
	const calculateSingleItemPrice = () => {
		if (cartItems.length) {
			const format = cartItems.map((cartItem) => {
				return `${cartItem.title} x ${cartItem.cartQuantity} = $${
					cartItem.cartQuantity * cartItem.price
				}`;
			});
			return setSummaryDetail(format);
		}
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-8">
					<h4 className="p-3">Cart/ Products</h4>
					<table className="table">
						<thead>
							<tr>
								<th>Image</th>
								<th>Title</th>
								<th>Price</th>
								<th>Brand</th>
								<th>Color</th>
								<th>Count</th>
								<th>Shipping</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((item) => {
								return (
									<tr key={item._id}>
										<th>
											<img
												alt="product"
												width="130"
												height="130"
												src={`${
													item.images.length
														? item.images[0].url
														: productsDefaultImages
												}`}
											/>
										</th>
										<td>{item.title}</td>
										<td>${item.price}</td>
										<td>{item.brand}</td>
										<td>
											<select
												id="colors"
												value={item.color}
												className="form-select form-select-sm"
												onChange={(e) =>
													changeCartItemColor(item, e.target.value)
												}
											>
												{colors.map((color) => (
													<option key={color} value={color}>
														{color}
													</option>
												))}
											</select>
										</td>
										<td>
											<div className="d-flex align-items-center">
												<div
													onClick={() => {
														handleDecreaseCartItem(item);
													}}
													style={{ cursor: "pointer" }}
												>
													&lt;
												</div>
												<div className="p-1">{item.cartQuantity}</div>
												<div
													onClick={() => {
														handleIncreaseCartItem(item);
													}}
													style={{ cursor: "pointer" }}
												>
													&gt;
												</div>
											</div>
										</td>
										<td>{item.shipping}</td>
										<td>
											<div
												className="text-center"
												onClick={() => {
													handleDeleteCartItem(item);
												}}
												style={{ cursor: "pointer" }}
											>
												X
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="col-md-4">
					<div className="mt-5">
						<h4 className="p-2">Order Summary</h4>
						<hr />
						<h5>Products</h5>
						<hr />
						{summaryDetail &&
							summaryDetail.map((detail) => (
								<div key={`detail${summaryDetail.indexOf(detail)}`}>
									{detail}
								</div>
							))}
						<hr />
						Total: ${totalPrice}
						<hr />
						{user && user.email ? (
							<div className="d-flex  justify-content-center">
								<div
									className="btn btn-outline-primary m-3"
									onClick={() => saveCartToDatabase()}
								>
									GO TO CHECKOUT
								</div>
							</div>
						) : (
							<div className="d-flex  justify-content-center">
								<div
									onClick={(e) => handleNavigate(e)}
									className="btn btn-outline-primary m-3 "
								>
									LOGIN TO CHECKOUT
								</div>
								<div
									onClick={(e) => handleNavigate(e)}
									className="btn btn-outline-primary m-3 "
								>
									LOGIN TO PAY CASH ON DELIVERY
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
