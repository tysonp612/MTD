const express = require("express");
const router = express.Router();

const stripeController = require("./../../controllers/stripe.controller/stripe.controller");
//middleware
const {
  authTokenCheck,
} = require("./../../middlewares/authentication.middleware/authentication.middleware");

router
  .route("/create-payment-intent")
  .post(authTokenCheck, stripeController.createPaymentIntent);
module.exports = router;
