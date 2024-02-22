import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	removeFromWishList,
	getAllWishList,
} from "./../../utils/user/user.utils";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import UserNav from "../../components/navigation/user-navigation.component";
const Wishlist = () => {
	const [wishList, setWishList] = useState([]);
	const user = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		loadWishList();
	}, [user]);
	const loadWishList = async () => {
		await getAllWishList(user.token).then((res) => {
			setWishList(res.data.wishList);
		});
	};
	const handleRemoveWishList = (productId) => {
		removeFromWishList(user.token, productId)
			.then((res) => {
				loadWishList();
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col-md-10 row">
					<h4 className="text-center p-3">Wish List</h4>
					{wishList.map((el) => {
						return (
							<div key={el._id} className="col-md-4">
								<ProductCard
									product={el}
									okay={true}
									handleRemoveWishList={handleRemoveWishList}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
