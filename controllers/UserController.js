const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const cartController = require("../controllers/CartControllers");

// -------------------
// Cart routes
router.post("/cart/add", cartController.addToCart);
router.get("/cart/:userId", cartController.getCart);
router.delete("/cart/:userId/:productId", cartController.removeFromCart);

// -------------------
// User CRUD and login
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const addUsers = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add user" });
  }
};

const getByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("cart.product")
      .populate("wishlist");

    if (!user) return res.status(404).json({ message: "User not found!" });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "Unable to update user" });
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------
// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const { password: pwd, ...userData } = user._doc;
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  addUsers,
  getByID,
  updateUser,
  deleteUsers,
  loginUser,
  router, // export router if you want to mount cart routes directly
};
