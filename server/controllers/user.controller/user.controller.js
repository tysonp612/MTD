const User = require("./../../models/user.schema");
const Cart = require("./../../models/cart.schema");
const Product = require("./../../models/product.schema");
const Coupon = require("./../../models/coupon.schema");
//CART
exports.updateCartItems = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const userId = user._id.toString();
    const existingCartOfUser = await Cart.findOne({ orderedBy: user._id });
    let couponBeingUsed;
    if (existingCartOfUser) {
      couponBeingUsed = await Coupon.findById(existingCartOfUser.coupon);
      existingCartOfUser.remove();
    }
    //make products array
    const products = [];
    cart.forEach((item) => {
      let obj = {};
      obj.product = item._id;
      obj.cartQuantity = item.cartQuantity;
      obj.color = item.color;
      obj.price = item.price * item.cartQuantity;

      return products.push(obj);
    });
    //make cartTotal
    const cartTotal = products
      .map((item) => item.price)
      .reduce((a, b) => a + b, 0);
    //make orderedBy
    const orderedBy = user._id;
    //make totalAfterDiscount
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

    const newCartItems = await Cart.create({
      products,
      coupon,
      cartTotal,
      orderedBy,
      totalAfterDiscount,
    });
    await User.findByIdAndUpdate(userId, { cart: products });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userId = user._id;
    //Note populate, second argument is to keep what we want
    const cart = await Cart.findOne({ orderedBy: userId })
      .populate("coupon", "expiry name")
      .populate("products.product", "_id title price");
    const couponUsed = await Coupon.findById(cart.coupon);
    const now = new Date();
    if (!couponUsed || now > couponUsed.expiry) {
      const updatedCart = await Cart.findOneAndUpdate(
        { orderedBy: userId },
        { coupon: null, totalAfterDiscount: null },
        { new: true }
      ).populate("products.product", "_id title price");
      const { products, cartTotal, totalAfterDiscount } = updatedCart;
      res.status(200).json({ products, cartTotal, totalAfterDiscount });
    } else {
      const { products, cartTotal, totalAfterDiscount, coupon } = cart;
      res.status(200).json({ products, cartTotal, totalAfterDiscount, coupon });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userId = user._id;
    const cart = await Cart.findOneAndRemove({ orderedBy: userId });
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
//COUPON
exports.applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;

    const checkCoupon = await Coupon.findOne({ name: coupon });
    if (!checkCoupon) {
      res.send("Coupon invalid");
    }
    const date = new Date();
    if (checkCoupon.expiry < date) {
      res.send("Coupon has expiried");
    } else {
      //check if user has applied the coupon
      const user = await User.findOne({ email: req.user.email });
      const existingCartOfUser = await Cart.findOne({
        orderedBy: user._id,
      });
      const couponId = await Coupon.findOne({ name: coupon });
      const checkCouponUsed = await User.findOne({
        _id: user._id,
        couponUsed: couponId,
      });
      if (checkCouponUsed) {
        res.status(200).json("This coupon was applied to this account");
      } else {
        const addCouponToUser = await User.findByIdAndUpdate(user._id, {
          $push: { couponUsed: couponId },
        });
        const newPrice = (
          existingCartOfUser.cartTotal -
          (existingCartOfUser.cartTotal * checkCoupon.discount) / 100
        ).toFixed(2);

        const newCartWithDiscountedPrice = await Cart.findOneAndUpdate(
          {
            orderedBy: user._id,
          },
          { totalAfterDiscount: newPrice, coupon: couponId._id },
          { new: true }
        );
        res.status(200).json(newCartWithDiscountedPrice.totalAfterDiscount);
      }
    }
  } catch (err) {
    console.log(err);
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
