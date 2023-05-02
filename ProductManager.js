const fs = require("fs");

class ProductManager {
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

    const addedProduct = {
      ...product,
      id: this.products.length + 1,
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

///////////////////////////////////////////TESTING PROCESS//////////////////////////////////////////////////

const productManager = new ProductManager("testingFileProducts.json");

const products = productManager.getProducts();
console.log(products);

const addedProduct = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

productManager.addProduct(addedProduct);

const updatedProducts = productManager.getProducts();
console.log(updatedProducts);

const foundProduct = productManager.getProductById(1);
console.log(foundProduct);

const notFoundProduct = productManager.getProductById(10);
console.log(notFoundProduct);

const updatedProduct = {
  title: "producto actualizado",
  description: "Este es un producto actualizado",
  price: 600,
  thumbnail: "Imagen actualizada",
  code: "abc123",
  stock: 6,
};

productManager.updateProduct(1, updatedProduct);
console.log(productManager.getProducts());

const otherProduct = {
  title: "producto prueba 2",
  description: "Este es un otro producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "cfg852",
  stock: 15,
};

productManager.addProduct(otherProduct);

productManager.deleteProduct(1);
console.log(productManager.getProducts());

productManager.deleteProduct(25);
console.log(productManager.getProducts());
