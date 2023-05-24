const socket = io();

const addProduct = document.getElementById("addProductForm");
const titleProduct = document.getElementById("titleProduct");
const descriptionProduct = document.getElementById("descriptionProduct");
const priceProduct = document.getElementById("priceProduct");
const stockProduct = document.getElementById("stockProduct");

const deleteProductForm = document.getElementById("deleteProductForm");
const id = document.getElementById("productId");

socket.on("products", (productsList) => {
  const productList = document.getElementById("dynamic-products");
  productList.innerHTML = "";

  productsList.forEach((product) => {
    const productHTML = `
      <div>
        <div >
          <div>
            <h2>${product.title}</h2>
            <p>ID: ${product.id}</p>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
          </div>
        </div>
      </div>`;

    productList.insertAdjacentHTML("beforeend", productHTML);
  });
});

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: titleProduct.value,
    description: descriptionProduct.value,
    stock: parseInt(stockProduct.value),
    price: parseInt(priceProduct.value),
  };
  socket.emit("new-product", newProduct);
  addProduct.reset();
});

deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("delete-product", parseInt(productId.value));
  deleteProductForm.reset();
});
