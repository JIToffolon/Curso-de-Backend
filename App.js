import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 8080;

const productManager = new ProductManager("products.json");

const testingProduct1 = {
  title: "testingProduct1",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456989",
  stock: 85,
};

const testingProduct2 = {
  title: "testingProduct2",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456889",
  stock: 85,
};
const testingProduct3 = {
  title: "testingProduct3",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456789",
  stock: 85,
};
const testingProduct4 = {
  title: "testingProduct4",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456689",
  stock: 85,
};
const testingProduct5 = {
  title: "testingProduct5",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456589",
  stock: 85,
};
const testingProduct6 = {
  title: "testingProduct6",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456489",
  stock: 85,
};
const testingProduct7 = {
  title: "testingProduct7",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456389",
  stock: 85,
};
const testingProduct8 = {
  title: "testingProduct8",
  description: "This is a testing Product",
  price: 150,
  thumbnail: "Not image",
  code: "123456289",
  stock: 85,
};

productManager.addProduct(testingProduct1);
productManager.addProduct(testingProduct2);
productManager.addProduct(testingProduct3);
productManager.addProduct(testingProduct4);
productManager.addProduct(testingProduct5);
productManager.addProduct(testingProduct6);
productManager.addProduct(testingProduct7);
productManager.addProduct(testingProduct8);

app.get("/products/:pid", async (req, res) => {
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

app.get("/products", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`server listening in port:${PORT}`);
});
