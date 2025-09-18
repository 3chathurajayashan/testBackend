// controllers/cartController.js
const User = require("../models/userModel");

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // check if product already in cart
    const item = user.cart.find((c) => c.product.toString() === productId);

    if (item) {
      item.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cart.product");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    res.json({ message: "Item removed", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
