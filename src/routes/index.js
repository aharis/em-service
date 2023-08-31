import { Router } from "express";
import routes from "./r1/routes.js";

const router = Router();

router.use("/r1", routes);

export default router;
