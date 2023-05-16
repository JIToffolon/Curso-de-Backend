import express from "express";
import {pRouter} from "./routes/products.route.js";
import {cRouter} from "./routes/carts.route.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", pRouter);
app.use("/api/carts", cRouter);

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "that route is not found", data: {} });
});

app.listen(PORT, () => {
  console.log(`server listening in port:${PORT}`);
});
