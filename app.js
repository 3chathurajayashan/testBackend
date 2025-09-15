// password - admin
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Admin = require("./models/AdminModel");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send("Back end is working");
});

// Import routes
const userRouter = require("./routes/userRoute");


app.use("/users", userRouter);

const productRouter = require("./routes/ProductRoute");
app.use("/products", productRouter);

const AdminRouter = require("./routes/AdminRoute");
app.use("/Admins", AdminRouter);

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.afu07sh.mongodb.net/")
  .then(() => {
    console.log(" Connected to MongoDB");

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Handle EADDRINUSE error
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(` Port ${PORT} is already in use. Please stop the process using it or change the port.`);
        process.exit(1);
      }
    });

  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

  

  app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await Admin.findOne({ gmail });
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    if (user.password === password) {
      const { password, ...userData } = user._doc;  
      return res.json({ status: "ok", user: userData });
    } else {
      return res.json({ status: "error", message: "Incorrect password" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});
