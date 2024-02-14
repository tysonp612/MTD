const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: ObjectId, ref: "Product" },
        cartQuantity: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    coupon: { type: ObjectId, ref: "Coupon" },
    orderedBy: { type: ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
