const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

// Add to cart
router.post("/add", cartController.addToCart);

// Get cart by user
router.get("/:userId", cartController.getCart);

// Remove specific product from cart
router.delete("/:userId/:productId", cartController.removeFromCart);

module.exports = router;
