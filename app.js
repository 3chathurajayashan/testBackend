const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Admin = require("./models/AdminModel");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/ProductRoute");
const adminRouter = require("./routes/AdminRoute");

const cartRouter = require("./routes/cartRoutes");

app.use("/users", userRouter);     // includes cart + wishlist routes
app.use("/products", productRouter);
app.use("/admins", adminRouter);
app.use("/cart", cartRouter);
// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});


 
 

// Login route without bcrypt
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const user = await Admin.findOne({ gmail });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Direct password comparison (not recommended for production)
    if (user.password !== password) {
      return res.status(401).json({ status: "error", message: "Incorrect password" });
    }

    // Remove password before sending response
    const { password: pwd, ...userData } = user._doc;

    return res.json({ status: "ok", user: userData });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});


// MongoDB connection
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.afu07sh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Please stop the process using it or change the port.`
        );
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
