import express from "express";
import { pRouter } from "./routes/products.route.js";
import { cRouter } from "./routes/carts.route.js";
import { home } from "./routes/home.route.js";
import { realTimeProducts } from "./routes/realtimeproducts.route.js";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


//ENDPOINTS
app.use("/api/products", pRouter);
app.use("/api/carts", cRouter);
app.use("/home", home);
app.use("/realtimeproducts", realTimeProducts);

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "that route is not found", data: {} });
});

//MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//SOCKET.IO
const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("conecction", (socket) => {
  socket.on("new-product", async (newProd) => {
    try {
      await productManager.addProduct({ ...newProd });
      const productsList = await productManager.getProducts();
      console.log(productsList);
      socketServer.emit("products", productsList);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("delete", async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      const productsList = await productManager.getProducts();
      console.log(productsList);
      socketServer.emit("products", productsList);
    } catch (err) {
      console.log(err);
    }
  });
});
