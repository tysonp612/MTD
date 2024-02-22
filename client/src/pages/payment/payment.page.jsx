import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckout } from "./../../components/stripe/stripe.component";
import { getCart, emptyCart } from "./../../utils/user/user.utils";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
const { Meta } = Card;
//load stripe outside of comp to avoid recreating stripe obj on every render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export const PaymentPage = () => {
	const [discountedPrice, setDiscountedPrice] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [coupon, setCoupon] = useState("");
	const user = useSelector((state) => state.user.currentUser);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user || !user.token) {
			// Redirect to login or show message
			navigate("/");
		} else {
			loadCart();
		}
	}, [user]);
	const loadCart = () => {
		getCart(user.token)
			.then((res) => {
				setDiscountedPrice(res.data.totalAfterDiscount);
				setTotalPrice(res.data.cartTotal);
				setCoupon(res.data.coupon);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="container p-5 text-center">
			<h4>Complete your purchase</h4>
			<div className="bg-warning">
				<h4>
					For testing purpose, please use Credit Card number as 4242 4242 4242
					4242
				</h4>
				<h4>MM/YY: 424</h4>
				<h4>CVC: 2424</h4>
				<h4>ZIP: 42424</h4>
			</div>

			<div className="col-md-8 offset-md-2">
				<Card
					actions={[
						<>
							<DollarOutlined key="total" />
							<div>Total: ${totalPrice}</div>
						</>,

						<>
							<CheckOutlined key="edit" />
							<div>
								Total Payable: ${discountedPrice ? discountedPrice : totalPrice}
							</div>
						</>,
					]}
				>
					<Meta
						title={coupon ? "Coupon applied!" : "No coupon applied"}
						description={
							coupon
								? `You have saved $${totalPrice - discountedPrice}`
								: `Your total is $${totalPrice}`
						}
					/>
				</Card>
			</div>
			<Elements stripe={stripePromise}>
				<div className="col-md-8 offset-md-2">
					<StripeCheckout user={user} />
				</div>
			</Elements>
		</div>
	);
};
