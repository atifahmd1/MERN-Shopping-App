import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./db/connection.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import UserRoutes from "./routes/user.routes.js";
import ProductRoutes from "./routes/product.routes.js";
import OrderRoutes from "./routes/order.routes.js";

app.use("/api/user", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

//error handling
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err); // Log the error
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message: message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello World!\nI'm a Node.js API",
  });
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});