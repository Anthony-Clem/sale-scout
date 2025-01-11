import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.post("/add", authenticate, addProduct);

router.get("/", authenticate, getProducts);

router.put("/update/:id", authenticate, updateProduct);

router.delete("/:id", authenticate, deleteProduct);

export default router;
