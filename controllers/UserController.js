const User = require("../models/userModel");

 
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
  const {
    pharmacyName,
    ownerName,
    email,
    password,
    phone,
    address,
    pharmacyLicenseNumber,
    profileImage,
    role,
  } = req.body;

  try {
    const newUser = new User({
      pharmacyName,
      ownerName,
      email,
      password,
      phone,
      address,
      pharmacyLicenseNumber,
      profileImage,
      role,
    });

    await newUser.save();
    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add user" });
  }
};

 
const getByID = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .populate("cart.product") // show product details inside cart
      .populate("wishlist"); // show wishlist product details

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

 
const updateUser = async (req, res) => {
  const id = req.params.id;
  const {
    pharmacyName,
    ownerName,
    email,
    password,
    phone,
    address,
    pharmacyLicenseNumber,
    profileImage,
    role,
  } = req.body;

  try {
    let user = await User.findByIdAndUpdate(
      id,
      {
        pharmacyName,
        ownerName,
        email,
        password,
        phone,
        address,
        pharmacyLicenseNumber,
        profileImage,
        role,
      },
      { new: true }  
    );

    if (!user) {
      return res.status(404).json({ message: "Unable to update user" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


const deleteUsers = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  addUsers,
  getByID,
  updateUser,
  deleteUsers,
};
