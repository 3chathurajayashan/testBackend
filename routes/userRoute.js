const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const cartController = require("../controllers/CartControllers");

// -------------------
// Login route
router.post("/login", UserController.loginUser);

// -------------------
// Users CRUD
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getByID);
router.post("/", UserController.addUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUsers);

// -------------------
// Cart routes (fixed)
router.post("/cart/add", cartController.addToCart);          // expects { userId, productId, quantity } in body
router.get("/cart/:userId", cartController.getCart);         // get cart of a user
router.delete("/cart/:userId/:productId", cartController.removeFromCart); // remove product

module.exports = router;
