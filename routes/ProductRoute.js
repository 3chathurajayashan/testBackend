const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts } = require("../controllers/ProductController");
const Product = require("../models/ProductModel");

// Add product
router.post("/", addProduct);

// Get all products
router.get("/", getAllProducts);

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
