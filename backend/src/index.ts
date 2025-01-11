import "dotenv/config";
import "./utils/cron";

import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { CLIENT_URL, MONGO_URI, PORT } from "./config/env";
import connectDB from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.route";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    })
  );
}
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/health", (req, res) => {
  res.sendStatus(200);
});

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
  connectDB();
});
