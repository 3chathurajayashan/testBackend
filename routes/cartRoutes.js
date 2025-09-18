const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartControllers");

// ✅ Add product to cart
router.post("/:userId/add", cartController.addToCart);

// ✅ Get user's cart
router.get("/:userId", cartController.getCart);

// ✅ Remove product from cart
router.delete("/:userId/:productId", cartController.removeFromCart);

module.exports = router;
