import { Router } from "express";
import { createOrder, updateOrders } from "../controllers/orderController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post("/", authenticateJWT, createOrder);
router.put("/:id", updateOrders);

export default router;
