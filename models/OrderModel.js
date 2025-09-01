const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
   
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel",  
      required: true,
    },

    
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "productModel",  
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,  
        },
      },
    ],

    
    totalAmount: {
      type: Number,
      required: true,
    },

     
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },

   
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderModel", orderSchema);
