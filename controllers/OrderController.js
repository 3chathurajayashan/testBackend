const Order = require("../models/OrderModel");

const mongoose = require("mongoose");
 

exports.createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, paymentMethod, shippingAddress } = req.body;

    const order = new Order({
      user: new mongoose.Types.ObjectId(user), // ✅ use 'new'
      products: products.map((p) => ({
        product: new mongoose.Types.ObjectId(p.product), // ✅ use 'new'
        quantity: p.quantity,
        priceAtPurchase: p.priceAtPurchase,
      })),
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    const savedOrder = await order.save();
    res.status(201).json({ status: "success", data: savedOrder });
  } catch (error) {
    console.error("Order creation error:", error);
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
