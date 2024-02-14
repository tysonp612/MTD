const User = require("../../models/user.schema");
const Cart = require("../../models/cart.schema");
const Product = require("../../models/product.schema");
const Order = require("../../models/order.schema");

exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const { products } = await Cart.findOne({ orderedBy: user._id });
    products.forEach(async (prod) => {
      const updatedProduct = await Product.findByIdAndUpdate(
        prod.product,
        {
          $inc: { quantity: -prod.cartQuantity, sold: prod.cartQuantity },
        },
        { new: true }
      );
    });
    const newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save();
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userOrders = await Order.find({ orderedBy: user._id }).populate(
      "products.product"
    );
    res.status(200).json(userOrders);
  } catch {}
};

exports.adminUpdateOrders = async (req, res) => {
  try {
    const orderTargeted = req.body.orderId;
    const update = req.body.update;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderTargeted,
      {
        orderStatus: update,
      },
      { new: true }
    );
    res.status(200).json("Order status updated!");
  } catch (err) {
    console.log(err);
  }
};

exports.adminGetAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .sort("-createdAt")
      .populate("products.product")
      .populate("orderedBy", "name address");
    res.status(200).json(allOrders);
  } catch (err) {
    console.log(err);
  }
};
