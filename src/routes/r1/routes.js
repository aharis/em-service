import { Router } from "express";
import { loginUser, getUsers } from "../../controllers/user.js";
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
  editEmployee,
  getEmployee,
} from "../../controllers/employee.js";
import uploadImage from "../../middlewares/uploadImage.js";

const router = Router();

router.post("/login", loginUser);
router.get("/users", getUsers);
router.post("/employee/create", uploadImage, addEmployee);
router.get("/employee", getEmployees);
router.delete("/employee/:id", deleteEmployee);
router.get("/employee/:id", getEmployee);
router.post("/employee/:id", uploadImage, editEmployee);

export default router;
