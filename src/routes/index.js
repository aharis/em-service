import { Router } from "express";
import user from "./r1/routes.js";

const router = Router();

router.use("/r1", user);

export default router;
