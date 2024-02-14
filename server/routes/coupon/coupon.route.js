const express = require("express");
const router = express.Router();
const couponController = require("./../../controllers/coupon.controller/coupon.controller");
const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication.middleware/authentication.middleware");

router
  .route("/create-coupon")
  .post(authTokenCheck, adminCheck, couponController.createCoupon);
router
  .route("/get-coupons")
  .get(authTokenCheck, adminCheck, couponController.getAllCoupons);
router
  .route("/delete-coupon/:id")
  .delete(authTokenCheck, adminCheck, couponController.deleteCoupon);

module.exports = router;
