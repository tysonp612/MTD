import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
	getAllCoupons,
	removeCoupon,
	createCoupon,
} from "./../../../utils/coupon/coupon.utils";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

export const CouponPage = () => {
	const user = useSelector((state) => state.user.currentUser);
	const [coupon, setCoupon] = useState({
		name: "",
		discount: "",
		expiry: new Date(),
	});
	const [allCoupons, setAllCoupons] = useState([]);
	useEffect(() => {
		loadCoupons();
	}, []);
	const { name, discount, expiry } = coupon;
	const loadCoupons = () => {
		getAllCoupons(user.token)
			.then((res) => setAllCoupons(res.data))
			.catch((err) => console.log(err));
	};
	const handleCreate = (e) => {
		e.preventDefault();
		createCoupon(user.token, coupon)
			.then((res) => {
				toast.success("Coupon created");
				loadCoupons();
			})
			.catch((err) => toast.error(err.response.data));
	};
	const handleCouponDelete = (id) => {
		removeCoupon(user.token, id)
			.then((res) => {
				toast.success("Coupon deleted");
				loadCoupons();
			})
			.catch((err) =>
				toast.error("Could not delete this coupon, please try again later")
			);
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					<h4>Coupon</h4>
					<form onSubmit={handleCreate} className="mb-4">
						<label>Name</label>
						<input
							type="text"
							className="form-control mb-3"
							value={name}
							onChange={(e) => {
								setCoupon({ ...coupon, name: e.target.value });
							}}
						/>
						<label>Discount Percentage (%)</label>
						<input
							type="text"
							className="form-control mb-3"
							value={discount}
							onChange={(e) => {
								setCoupon({ ...coupon, discount: e.target.value });
							}}
						/>
						<p>Select expiry date</p>
						<DatePicker
							className="border border-secondary"
							selected={expiry}
							onChange={(date) => {
								setCoupon({ ...coupon, expiry: date });
							}}
						/>
						<button className="btn btn-outline-primary mt-3">Save</button>
					</form>
					{allCoupons &&
						allCoupons.map((coupon) => {
							return (
								<div key={coupon._id}>
									<div className="alert alert-secondary row">
										<div className="col-md-11 d-flex ">
											<div>
												Coupon name: {coupon.name} - Expiry date:
												{coupon.expiry.split("T")[0]} - Percentage discount:{" "}
												{coupon.discount}%
											</div>
										</div>
										<DeleteOutlined
											className="col-md-1"
											onClick={() => handleCouponDelete(coupon._id)}
										>
											Delete
										</DeleteOutlined>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};
