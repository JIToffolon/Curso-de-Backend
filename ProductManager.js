import fs from "fs";

export default class ProductManager {
  constructor(testingFile) {
    this.testingFile = testingFile;
    this.products = [];
    this.loadingProducts();
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("all fields are required");
      return;
    }

    const existingCode = this.products.some(
      (prod) => prod.code === product.code
    );

    if (existingCode) {
      console.log(`There is already a product with the code ${product.code}`);
      return;
    }

    const maxId = Math.max(...this.products.map((product) => product.id), 0);
    const addedProduct = {
      ...product,
      id: maxId + 1,
    };

    this.products.push(addedProduct);
    this.saveProducts();
    console.log(`Added Product ${addedProduct.id}  ${addedProduct.title} `);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Product not found");
    }
  }

  loadingProducts() {
    try {
      const data = fs.readFileSync(this.testingFile, "utf-8");
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (err) {
      console.log(`Error reading file ${err.message}`);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(
        this.testingFile,
        JSON.stringify(this.products),
        "utf-8"
      );
    } catch (err) {
      console.log(`Error writing file ${err.message}`);
    }
  }

  deleteProduct(id) {
    const indexProduct = this.products.findIndex(
      (product) => product.id === id
    );
    if (indexProduct === -1) {
      console.log(`Product ${id} not found`);
      return;
    }

    this.products.splice(indexProduct, 1);
    this.saveProducts();
    console.log(`Product ${id} removed`);
  }

  updateProduct(id, updatedProduct) {
    const indexProduct = this.products.findIndex(
      (product) => product.id === id
    );
    if (indexProduct === -1) {
      console.log(`Product ${id} not found`);
      return;
    }

    this.products[indexProduct] = {
      ...updatedProduct,
      id,
    };

    this.saveProducts();
    console.log(`Updated Product ${id} `);
  }
}
