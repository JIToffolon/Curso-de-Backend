import fs from "fs";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager("products.json");

export default class CartManager {
  constructor(testingFile) {
    this.testingFile = testingFile;
    this.carts = [];
    this.loadingCarts();
  }

  loadingCarts() {
    try {
      const data = fs.readFileSync(this.testingFile, "utf-8");
      if (data) {
        this.carts = JSON.parse(data).map((cart) => ({
          ...cart,
          products: cart.products || [],
        }));
      }
    } catch (err) {
      console.log(`Error reading file ${err.message}`);
    }
  }

  saveCarts() {
    try {
      fs.writeFileSync(this.testingFile, JSON.stringify(this.carts), "utf-8");
    } catch (err) {
      console.log(`Error writing file ${err.message}`);
    }
  }

  async addCart() {
    const newCart = {
      id: this.carts.length + 1,
      products: [],
    };

    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  async getCarts() {
    return this.carts;
  }

  async getCartById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    if (cart) {
      return cart;
    }
  }

  async addProductToCart(cartId, productId) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    
    const existingProduct = cart.products.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const product = await this.getProductById(productId);
      if (!product) {
        return;
      }

      cart.products.push({
        id: product.id,
        quantity: 1,
      });
    }

    this.saveCarts();
    console.log(`Product ${productId} added to cart ${cartId}`);
  }

  async getProductById(id) {
    const product = await productManager.getProductById(id);
    console.log(product);
    return product;
  }
}
