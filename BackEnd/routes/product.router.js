const router = require("express").Router();
const productController = require("../controllers/product.controller");

router
  .route("/products")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/products/Quantity").get(productController.Quality);

router
  .route("/products/:id")
  .get(productController.getDetailProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
