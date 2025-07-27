// password - admin
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
const router = require("./routes/userRoute");
app.use("/users", router);

// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.afu07sh.mongodb.net/")
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Handle EADDRINUSE error
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use. Please stop the process using it or change the port.`);
        process.exit(1);
      }
    });

  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
