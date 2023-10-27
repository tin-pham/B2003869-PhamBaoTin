const router = require("express").Router();
const categoryController = require("../controllers/category.controller");

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route("/category/:id")
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
