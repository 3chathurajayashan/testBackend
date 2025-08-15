const express = require("express");
const router = express.Router();

const Product = require("../models/ProductModel");
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.getAllProducts);

module.exports = router;