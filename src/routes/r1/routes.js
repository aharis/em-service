import { Router } from "express";
import { loginUser, getUsers } from "../../controllers/user.js";
import { addEmployee, getEmployees } from "../../controllers/employee.js";
import uploadImage from "../../middlewares/uploadImage.js";

const router = Router();

router.post("/login", loginUser);
router.get("/users", getUsers);
router.post("/employee/create", uploadImage, addEmployee);
router.get("/employee", getEmployees);

export default router;
