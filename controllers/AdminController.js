const Admin = require("../models/AdminModel");
const bcrypt = require("bcrypt");

// Display all admins (optionally filter by role)
const getAllAdmins = async (req, res, next) => {
    const { role } = req.query; // optional query param
    try {
        const filter = role ? { role } : {};
        const admins = await Admin.find(filter);
        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: "No admins found!" });
        }
        return res.status(200).json({ admins });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


const addAdmins = async (req, res) => {
  const { name, gmail, mobile, password, homeTown, role } = req.body;

  try {
    // check existing gmail
    const existingAdmin = await Admin.findOne({ gmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Gmail already exists!" });
    }

    // create admin
    const admin = new Admin({ name, gmail, mobile, password, homeTown, role });
    await admin.save();

    res.status(201).json({ admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get admin by ID
const getByID = async (req, res, next) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found!" });
        }
        return res.status(200).json({ admin });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Update admin
const updateAdmin = async (req, res, next) => {
    const id = req.params.id;
    const { name, gmail, mobile, password, homeTown, role } = req.body;

    if (role && !["admin", "inventory", "sales"].includes(role)) {
        return res.status(400).json({ message: "Invalid role!" });
    }

    try {
        const updateData = { name, gmail, mobile, homeTown, role };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const admin = await Admin.findByIdAndUpdate(id, updateData, { new: true });
        if (!admin) {
            return res.status(404).json({ message: "Unable to update admin details" });
        }
        return res.status(200).json({ admin });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

// Delete admin
const deleteAdmins = async (req, res, next) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: "Unable to delete admin" });
        }
        return res.status(200).json({ admin });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllAdmins,
    addAdmins,
    getByID,
    updateAdmin,
    deleteAdmins
};
