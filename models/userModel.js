// models/userModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  pharmacyName: {
    type: String,
    required: [true, "Pharmacy name is required"],
    trim: true,
  },
  ownerName: {
    type: String,
    required: [true, "Owner name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  pharmacyLicenseNumber: {
    type: String,
    required: [true, "Pharmacy license number is required"],
    unique: true,
  },
  profileImage: {
    type: String,
    default: "",
  },

   
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "productModel" },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],

   
  wishlist: [{ type: Schema.Types.ObjectId, ref: "productModel" }],
},
{ timestamps: true });

module.exports = mongoose.model("userModel", userSchema);
