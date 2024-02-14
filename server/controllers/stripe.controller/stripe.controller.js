const User = require("./../../models/user.schema");
const Cart = require("./../../models/cart.schema");
const Product = require("./../../models/product.schema");
const Coupon = require("./../../models/coupon.schema");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  //1 find user
  const user = await User.findOne({ email: req.user.email });
  const cart = await Cart.findOne({ orderedBy: user._id });
  const coupon = await Coupon.findById(cart.coupon);
  //2 get user cart total
  let totalAmountToPay;
  if (
    coupon &&
    new Date() < coupon.expiry &&
    cart.totalAfterDiscount &&
    cart.totalAfterDiscount > 0
  ) {
    totalAmountToPay = cart.totalAfterDiscount;
  } else {
    totalAmountToPay = cart.cartTotal;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmountToPay * 100,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
