const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// Add to wishlist
router.post("/add", wishlistController.addToWishlist);

// Get wishlist by user
router.get("/:userId", wishlistController.getWishlist);

// Remove specific product from wishlist
router.delete("/:userId/:productId", wishlistController.removeFromWishlist);

module.exports = router;
