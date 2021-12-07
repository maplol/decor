const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/product", checkRole("ADMIN"), productController.createProduct);
router.put("/product", checkRole("ADMIN"), productController.editProduct);
router.delete(
	"/product/:id",
	checkRole("ADMIN"),
	productController.removeProduct
);
router.get("/:typeId", productController.getAllProducts);
router.get("/product/:id", productController.getOneProduct);
//.get("/:type", productController.filterProduct);
//router.get("/:type/?price=:price?", productController.filterProduct);

// router.get("/:type//", productController.filterProduct);

module.exports = router;
