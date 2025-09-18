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

 
app.get("/", (req, res) => {
  res.send(" Backend is working");
});

 
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/ProductRoute");
const adminRouter = require("./routes/AdminRoute");

 
app.use("/users", userRouter);     // includes cart + wishlist routes
app.use("/products", productRouter);
app.use("/admins", adminRouter);
 
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await Admin.findOne({ gmail });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    if (user.password === password) {
      // remove password before sending response
      const { password, ...userData } = user._doc;
      return res.json({ status: "ok", user: userData });
    } else {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

 
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.afu07sh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server
    const server = app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });

     
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          ` Port ${PORT} is already in use. Please stop the process using it or change the port.`
        );
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
