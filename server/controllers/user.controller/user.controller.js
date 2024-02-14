const User = require("./../../models/user.schema");
const Cart = require("./../../models/cart.schema");
const Product = require("./../../models/product.schema");
const Coupon = require("./../../models/coupon.schema");
//CART
// updateCartItems function
// 1. Fetches user based on email. If not found, returns an error.
// 2. Checks for an existing cart. If found, deletes it after handling coupon logic.
// 3. Transforms cart items from request to a suitable format for storage.
// 4. Calculates the total price and applies discounts if a coupon is used.
// 5. Creates a new cart document with updated items and totals.
// 6. Updates the user's document with the new cart items.
// 7. Sends a success response.
exports.updateCartItems = async (req, res) => {
	try {
		const { cart } = req.body;
		const user = await User.findOne({ email: req.user.email });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const userId = user._id.toString();
		// Find the existing cart for the user.
		const existingCartOfUser = await Cart.findOne({ orderedBy: user._id });

		// Placeholder for coupon application, to be handled later.

		let couponBeingUsed;

		// If a cart exists, remove it to make way for the updated cart.
		if (existingCartOfUser) {
			// Check if the cart had a coupon applied.
			couponBeingUsed = await Coupon.findById(existingCartOfUser.coupon);
			// Use the `deleteOne` method instead of `remove` which is deprecated.
			await Cart.deleteOne({ orderedBy: user._id });
		}

		// Transform the cart items from the request body to the desired format.
		const products = cart.map((item) => ({
			product: item._id,
			cartQuantity: item.cartQuantity,
			color: item.color,
			price: item.price * item.cartQuantity,
		}));

		// Calculate the total price of the cart.
		const cartTotal = products.reduce((a, b) => a + b.price, 0);

		// Calculate the total after applying any discount from a coupon.
		let totalAfterDiscount;
		let coupon;
		if (couponBeingUsed) {
			const discountAmount = couponBeingUsed.discount;
			totalAfterDiscount = (
				cartTotal -
				(cartTotal * discountAmount) / 100
			).toFixed(2);
			coupon = couponBeingUsed._id;
		}

		// Create a new cart with the updated items and prices.
		await Cart.create({
			products,
			coupon,
			cartTotal,
			orderedBy: user._id,
			totalAfterDiscount,
		});

		// Update the user document with the new cart items.
		await User.findByIdAndUpdate(user._id, { cart: products });

		// Send a response indicating the operation was successful.
		res.status(200).json({ ok: true });
	} catch (err) {
		console.log(err);
	}
};

// getCart function
// 1. Finds the user and their cart.
// 2. Populates details for products and coupons in the cart.
// 3. Checks and updates the cart if a used coupon has expired (this needs fixing).
// 4. Returns the cart details, including products, totals, and coupon info.
exports.getCart = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		// Ensure user exists
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const userId = user._id;
		const cart = await Cart.findOne({ orderedBy: userId })
			.populate("coupon", "expiry name")
			.populate("products.product", "_id title price");

		// Check if cart exists and has a coupon applied
		if (cart && cart.coupon) {
			const now = new Date();
			if (now > cart.coupon.expiry) {
				// Update cart if coupon has expired
				const updatedCart = await Cart.findOneAndUpdate(
					{ orderedBy: userId },
					{ $unset: { coupon: 1, totalAfterDiscount: 1 } }, // Properly unset fields
					{ new: true }
				).populate("products.product", "_id title price");

				// Destructure to avoid sending unwanted fields
				const { products, cartTotal } = updatedCart;
				res.status(200).json({ products, cartTotal });
			} else {
				// If coupon is still valid
				const { products, cartTotal, totalAfterDiscount, coupon } = cart;
				res
					.status(200)
					.json({ products, cartTotal, totalAfterDiscount, coupon });
			}
		} else {
			// Handle case where cart may not have a coupon or cart does not exist
			if (cart) {
				const { products, cartTotal } = cart;
				res.status(200).json({ products, cartTotal });
			} else {
				res.status(404).json({ message: "Cart not found" });
			}
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

exports.emptyCart = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		const userId = user._id;
		const cart = await Cart.findOneAndDelete({ orderedBy: userId });
		res.status(200).json("cart emptied");
	} catch (err) {
		console.log(err);
	}
};
//ADDRESS
exports.updateAddress = async (req, res) => {
	try {
		const { address } = req.body;
		const update = await User.findOneAndUpdate(
			{ email: req.user.email },
			{ address: address }
		);
		console.log(address);
		res.status(200).json(true);
	} catch (err) {
		console.log(err);
	}
};

// applyCoupon function
// 1. Validates the provided coupon for existence and expiry.
// 2. Checks if the coupon was already used by the user.
// 3. Updates the user and cart with the coupon details and new discounted total.
// 4. Returns the new total after discount.
exports.applyCoupon = async (req, res) => {
	try {
		const { coupon } = req.body;
		const user = await User.findOne({ email: req.user.email });

		// Ensure user exists
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const checkCoupon = await Coupon.findOne({ name: coupon });
		if (!checkCoupon) {
			return res.status(400).json({ message: "Coupon invalid" });
		}
		const date = new Date();
		if (checkCoupon.expiry < date) {
			return res.status(400).json({ message: "Coupon has expired" });
		}

		// Check if coupon was already used by the user
		if (user.couponUsed && user.couponUsed.includes(checkCoupon._id)) {
			return res
				.status(400)
				.json({ message: "This coupon was already applied to this account" });
		}

		const existingCartOfUser = await Cart.findOne({
			orderedBy: user._id,
		});

		if (!existingCartOfUser) {
			return res.status(404).json({ message: "No cart found for this user" });
		}

		// Apply coupon to the cart
		const newPrice = (
			existingCartOfUser.cartTotal -
			(existingCartOfUser.cartTotal * checkCoupon.discount) / 100
		).toFixed(2);

		await Cart.findOneAndUpdate(
			{ orderedBy: user._id },
			{ totalAfterDiscount: newPrice, coupon: checkCoupon._id },
			{ new: true }
		);

		// Update user with used coupon
		await User.findByIdAndUpdate(user._id, {
			$push: { couponUsed: checkCoupon._id },
		});

		res.status(200).json({
			message: "Coupon applied successfully",
			totalAfterDiscount: newPrice,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};
//WISHLIST
exports.addToWishList = async (req, res) => {
	try {
		const userId = await User.findOne({ email: req.user.email });
		const { productId } = req.body;
		const id = await Product.findById(productId);
		const addToWishList = await User.findByIdAndUpdate(
			userId._id,
			{
				$push: { wishList: id._id },
			},
			{ new: true }
		);
		res.status(200).json("Added to wish list");
	} catch (err) {
		console.log(err);
	}
};
exports.getAllWishList = async (req, res) => {
	try {
		const userWishList = await User.findOne({ email: req.user.email }).populate(
			"wishList",
			"_id title description images slug ratings"
		);
		res.status(200).json(userWishList);
	} catch (err) {
		console.log(err);
	}
};
exports.removeFromWishList = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		const { productId } = req.params;
		const newWishlist = await User.findByIdAndUpdate(
			user._id,
			{
				$pull: { wishList: productId },
			},
			{ new: true }
		);
		res.status(200).json("product has been removed from wishlist");
	} catch (err) {
		console.log(err);
	}
};
