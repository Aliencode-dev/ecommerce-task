const express = require("express");
const router = express.Router();
const { Product } = require("../models");

// Create product
router.post("/", async (req, res) => {
  const { name, description, price, imageURL, createdBy } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      imageURL,
      createdBy,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageURL } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.name = name;
    product.description = description;
    product.price = price;
    product.imageURL = imageURL;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
