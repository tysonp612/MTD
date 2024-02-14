const express = require("express");
const {
  authTokenCheck,
  adminCheck,
} = require("../../middlewares/authentication.middleware/authentication.middleware");
const orderController = require("./../../controllers/order.controller/order.controller");
const router = express.Router();

router
  .route("/order/createOrder")
  .post(authTokenCheck, orderController.createOrder);
router.route("/order/getOrders").get(authTokenCheck, orderController.getOrders);
router
  .route("/admin/order/updateOrders")
  .put(authTokenCheck, adminCheck, orderController.adminUpdateOrders);
router
  .route("/admin/order/getAllOrders")
  .get(authTokenCheck, adminCheck, orderController.adminGetAllOrders);
module.exports = router;
