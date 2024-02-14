const express = require("express");
const {
  authTokenCheck,
} = require("../../middlewares/authentication.middleware/authentication.middleware");
const userController = require("./../../controllers/user.controller/user.controller");
const router = express.Router();

router
  .route("/user/addToCart")
  .put(authTokenCheck, userController.updateCartItems);
router.route("/user/getCart").get(authTokenCheck, userController.getCart);
router
  .route("/user/emptyCart")
  .delete(authTokenCheck, userController.emptyCart);
router
  .route("/user/updateAddress")
  .put(authTokenCheck, userController.updateAddress);
router
  .route("/user/applyCoupon")
  .post(authTokenCheck, userController.applyCoupon);

router
  .route("/user/add-wishlist")
  .post(authTokenCheck, userController.addToWishList);
router
  .route("/user/get-wishlist")
  .get(authTokenCheck, userController.getAllWishList);
router
  .route("/user/remove-wishlist/:productId")
  .delete(authTokenCheck, userController.removeFromWishList);
module.exports = router;
