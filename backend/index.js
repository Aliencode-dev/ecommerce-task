require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const db = require("./models");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express(); // Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Sync database
db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
