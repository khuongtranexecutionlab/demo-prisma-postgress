import { Router } from "express";
import { createUser, getMe, getUsers } from "../controllers/userController";

const router = Router();

router.post("/create", createUser);
router.get("/", getUsers);
router.get("/:email", getMe);
// router.get('/with-posts', getUsersWithPosts);

export default router;
