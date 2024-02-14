const express = require("express");
const router = express.Router();

//middlewares
const {
  authTokenCheck,
  adminCheck,
} = require("../../middlewares/authentication.middleware/authentication.middleware");

//controller
const categoryController = require("./../../controllers/category.controller/category.controller");

//routes
router.route("/categories").get(categoryController.getAllCategory);
router.route("/category/:slug").get(categoryController.getOneCategory);
router
  .route("/category")
  .post(authTokenCheck, adminCheck, categoryController.createCategory);
router
  .route("/category/:slug")
  .put(authTokenCheck, adminCheck, categoryController.updateCategory);
router
  .route("/category/:slug")
  .delete(authTokenCheck, adminCheck, categoryController.deleteCategory);
router
  .route("/category/subcategory/:id")
  .get(categoryController.getSubFromCategoryId);
module.exports = router;
