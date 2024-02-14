const express = require("express");
const router = express.Router();
const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication.middleware/authentication.middleware");

const subCategoryController = require("./../../controllers/sub-category.controller/sub-category.controller");
//routes
router.route("/sub-categories").get(subCategoryController.getAllSubCategory);
router
  .route("/sub-category/:slug")
  .get(subCategoryController.getOneSubCategory);
router
  .route("/sub-category")
  .post(authTokenCheck, adminCheck, subCategoryController.createSubCategory);
router
  .route("/sub-category/:slug")
  .put(authTokenCheck, adminCheck, subCategoryController.updateSubCategory);
router
  .route("/sub-category/:slug")
  .delete(authTokenCheck, adminCheck, subCategoryController.deleteSubCategory);

module.exports = router;
