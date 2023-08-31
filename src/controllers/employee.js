import conn from "../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const addEmployee = (req, res) => {
  const employeeId = uuidv4();
  const sql =
    "INSERT INTO employees (`employeeId`, `firstName`, `lastName`, `email`, `password`, `address`, `image`) VALUES (?)";

  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error in hashing password", details: err });
    }

    const values = [
      employeeId,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hash,
      req.body.address,
      req.file.originalname, // Assuming req.file.filename contains the uploaded file's name
    ];

    conn.query(sql, [values], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error in SQL query", details: err });
      }

      return res.json({ message: "Employee added successfully" });
    });
  });
};

export const getEmployees = (req, res) => {
  const sql = "SELECT * FROM employees";
  conn.query(sql, (error, result) => {
    if (result.length === 0) {
      return res.status(400).json({ message: "Employee not found" });
    } else {
      return res.status(200).json({ message: "Success", result: result });
    }
  });
};
