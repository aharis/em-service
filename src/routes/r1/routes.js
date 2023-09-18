import { Router } from "express";
import {
  loginUser,
  getUsers,
  deleteUser,
  getUser,
  adminCount,
} from "../../controllers/user.js";
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
  editEmployee,
  getEmployee,
} from "../../controllers/employee.js";
import uploadImage from "../../middlewares/uploadImage.js";
import authRoutes from "../../middlewares/authRoutes.js";

const router = Router();

router.post("/login", loginUser, authRoutes);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.post("/employee/create", uploadImage, addEmployee);
router.get("/employee", getEmployees);
router.delete("/employee/:id", deleteEmployee);
router.get("/employee/:id", getEmployee);
router.post("/employee/:id", uploadImage, editEmployee);
router.get("/adminCount", adminCount, authRoutes);

export default router;
