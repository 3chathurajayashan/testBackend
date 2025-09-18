const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  pharmacyName: { type: String, required: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true, trim: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  pharmacyLicenseNumber: { type: String, required: true, unique: true },
  profileImage: { type: String, default: "" },

  // ✅ Cart array
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "productModel" },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.models.userModel || mongoose.model("userModel", userSchema);
