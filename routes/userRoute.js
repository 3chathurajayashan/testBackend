const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const cartController = require("../controllers/cartController");
const wishlistController = require("../controllers/wishlistController");
 
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getByID);
router.post("/", UserController.addUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUsers);

 
router.post("/:userId/cart/add", cartController.addToCart);
router.get("/:userId/cart", cartController.getCart);
router.delete("/:userId/cart/remove", cartController.removeFromCart);

 
router.post("/:userId/wishlist/add", wishlistController.addToWishlist);
router.get("/:userId/wishlist", wishlistController.getWishlist);
router.delete("/:userId/wishlist/remove", wishlistController.removeFromWishlist);

module.exports = router;
