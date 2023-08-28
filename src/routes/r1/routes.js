import { Router } from "express";
import { addUser, getUsers } from "../../controllers/user.js";

const router = Router();

router.post("/user", addUser);
router.get("/user", getUsers);

export default router;
