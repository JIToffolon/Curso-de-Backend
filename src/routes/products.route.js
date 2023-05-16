import express from "express";
import ProductManager from "../functions/ProductManager.js";

export const pRouter = express.Router();
const productManager = new ProductManager("products.json");

pRouter.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productManager.getProductById(parseInt(id));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

pRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

pRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    await productManager.addProduct(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

pRouter.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const updatedProduct = req.body;
    await productManager.updateProduct(parseInt(id), updatedProduct);
    res.json({ message: `Updated Product ${id} ` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

pRouter.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    productManager.deleteProduct(parseInt(id));
    res.json({ message: `Product ${id} removed` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
