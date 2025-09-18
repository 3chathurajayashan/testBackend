const User = require("../models/userModel");
const Product = require("../models/ProductModel");

// Add to cart (updated)
exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existing = user.cart.find((item) => item.product.toString() === productId);

    if (existing) {
      // ✅ Set quantity directly instead of adding
      existing.quantity = quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate("cart.product"); // populate product details
    res.status(200).json({ message: "Product added/updated in cart", cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
};


// Get cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    await user.save();
    await user.populate("cart.product");
    res.json({ message: "Item removed", cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
