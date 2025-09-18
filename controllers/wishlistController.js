// controllers/wishlistController.js
const User = require("../models/userModel");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    }

    await user.save();
    res.json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get wishlist
exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("wishlist");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (p) => p.toString() !== productId
    );

    await user.save();
    res.json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
