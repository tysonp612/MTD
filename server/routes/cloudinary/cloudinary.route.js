const express = require("express");
const router = express.Router();

const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication.middleware/authentication.middleware");

const cloudinaryController = require("./../../controllers/cloudinary.controller/cloudinary.controller");
router
  .route("/uploadimages")
  .post(authTokenCheck, adminCheck, cloudinaryController.uploadImages);
router
  .route("/removeimages")
  .post(authTokenCheck, adminCheck, cloudinaryController.removeImages);
module.exports = router;
