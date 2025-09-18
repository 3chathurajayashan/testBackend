const Order = require("../models/OrderModel");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, paymentMethod, shippingAddress } = req.body;

    const newOrder = new Order({
      user,
      products,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ status: "success", data: savedOrder });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("products.product", "name price");

    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get orders of a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId })
      .populate("products.product", "name price");

    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, paymentStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, paymentStatus },
      { new: true }
    );

    res.status(200).json({ status: "success", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete an order (admin)
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ status: "success", message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
