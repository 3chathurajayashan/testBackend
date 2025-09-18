const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders (admin)
router.get("/", orderController.getAllOrders);

// Get orders of a specific user
router.get("/user/:userId", orderController.getUserOrders);

// Update order status (admin)
router.put("/:orderId", orderController.updateOrderStatus);

// Delete an order (admin)
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;
