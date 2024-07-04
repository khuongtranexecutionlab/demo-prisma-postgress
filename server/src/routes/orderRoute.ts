import { Router } from "express";
import { createOrder, updateOrders } from "../controllers/orderController";

const router = Router();

router.post("/", createOrder);
router.put("/:id", updateOrders);

export default router;
