class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.lastId = 0;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("All fields are required");
    }

    if (this.getProductByCode(code)) {
      throw new Error("Code already exists");
    }

    const product = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Not found");
    }
    return product;
  }

  getProductByCode(code) {
    return this.products.find((product) => product.code === code);
  }
}
