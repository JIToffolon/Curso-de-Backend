import express from "express";
import CartManager from "../functions/CartManager.js";

export const cRouter = express.Router();
const cartManager = new CartManager("cart.json");

cRouter.get("/", async (req, res) => {
  try {
    const cart = await cartManager.getCarts();
    if (cart) {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

cRouter.post("/", async (req, res) => {
  try {
    const nCart = await cartManager.addCart();
    res.status(201).json(nCart);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

cRouter.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await cartManager.getCartById(parseInt(id));
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ message: `Cart ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

cRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ message: `Cart ${cartId} not found` });
    }

    const product = await cartManager.getProductById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product ${productId} not found` });
    }

    await cartManager.addProductToCart(cartId, productId);
    res.json({ message: `Product ${productId} added to cart ${cartId}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
