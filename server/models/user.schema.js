const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			// required: true,
			index: true,
		},
		role: {
			type: String,
			default: "subcriber",
		},
		cart: [
			{
				product: { type: ObjectId, ref: "Product" },
				cartQuantity: Number,
				color: String,
				price: Number,
			},
		],
		address: {
			type: String,
		},
		couponUsed: [
			{
				type: ObjectId,
				ref: "Coupon",
			},
		],
		wishList: [{ type: ObjectId, ref: "Product" }],
	},
	//timestamps true will update time automatically so we dont have to create createdAt
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
