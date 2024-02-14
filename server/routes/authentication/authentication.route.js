const express = require("express");
const authController = require("../../controllers/authentication.controller/authentication.controller");
const router = express.Router();
const {
	authTokenCheck,
	adminCheck,
} = require("../../middlewares/authentication.middleware/authentication.middleware");

// router
//   .route("/create-or-update-user")
//   .post(authTokenCheck, authController.createOrUpdateUser);

router.route("/create-or-update-user").post(authController.createOrUpdateUser);
router.route("/create-or-update-user").post(authController.createOrUpdateUser);
router
	.route("/admin-route")
	.post(authTokenCheck, adminCheck, authController.adminController);
module.exports = router;
