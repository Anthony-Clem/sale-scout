import { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check-auth", authenticate, checkAuth);

export default router;
