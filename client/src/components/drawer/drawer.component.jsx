import React from "react";
import { CartActionTypes } from "./../../redux/reducers/cart/cart.types";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Drawer } from "antd";
import productsDefaultImages from "./../../components/images/techdevices.jpeg";
const DrawerComponent = () => {
	const history = useHistory();
	const drawerVisible = useSelector((state) => state.cart.drawerVisible);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();
	const onClose = () => {
		dispatch({ type: CartActionTypes.TOGGLE_DRAWER });
	};

	const handleDelete = (cartItem) => {
		dispatch({
			type: CartActionTypes.DELETE_FROM_CART,
			payload: cartItem,
		});
	};
	const handleHistory = () => {
		history.push("/cart");
		dispatch({ type: CartActionTypes.TOGGLE_DRAWER });
	};
	return (
		<>
			<Drawer
				title="Cart"
				placement="right"
				onClose={onClose}
				width="300px"
				visible={drawerVisible}
			>
				{cartItems &&
					cartItems.map((cartItem) => {
						return (
							<div key={cartItem._id}>
								<div className="d-flex justify-content-around align-items-center">
									<img
										width="130"
										height="130"
										src={`${
											cartItem.images.length
												? cartItem.images[0].url
												: productsDefaultImages
										}`}
									/>
									<div
										style={{ cursor: "pointer" }}
										onClick={() => handleDelete(cartItem)}
									>
										X
									</div>
								</div>

								<br />
								<div className="text-center">{cartItem.title} x 1</div>
								<hr />
							</div>
						);
					})}
				<div
					className="btn btn-primary justify-content-center  d-flex m-4"
					onClick={() => handleHistory()}
				>
					GO TO CART
				</div>
			</Drawer>
		</>
	);
};

export default DrawerComponent;
