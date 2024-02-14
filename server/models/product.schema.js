const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
			minlength: 2,
			text: true,
		},
		slug: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
			maxlength: 200,
			text: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
			maxlength: 32,
		},
		category: {
			type: ObjectId,
			ref: "Category",
		},
		subcategory: [{ type: ObjectId, ref: "SubCategory" }],
		quantity: {
			type: Number,
		},
		sold: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
		},
		shipping: {
			type: String,
			enum: ["Yes", "No"],
		},
		color: {
			type: String,
			enum: ["Black", "Silver", "White", "Blue", "Dark Grey"],
		},
		brand: {
			type: String,
		},
		ratings: [
			{
				star: Number,
				postedBy: {
					type: ObjectId,
					ref: "User",
				},
			},
		],
	},
	{ timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
