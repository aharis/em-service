import conn from "../config/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const addEmployee = (req, res) => {
  const employeeId = uuidv4();
  const checkEmployeeExist = "SELECT * FROM employees WHERE email = ?";
  const sql =
    "INSERT INTO employees (`employeeId`, `firstName`, `lastName`, `email`, `password`, `address`, `image`) VALUES (?)";

  conn.query(checkEmployeeExist, [req.body.email], (error, existingUser) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error in SQL query", details: error });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Employee already exists" });
    }

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
        req.file.originalname,
      ];

      conn.query(sql, [values], (error, result) => {
        if (values.email === req.body.email)
          return res.json({ message: "User alredy exist" });
        if (error) {
          return res
            .status(500)
            .json({ message: "Error in SQL query", details: error });
        }
        return res.status(201).json({ message: "Employee added successfully" });
      });
    });
  });
};

export const getEmployees = (req, res) => {
  const sql = "SELECT * FROM employees";
  conn.query(sql, (error, result) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error in SQL query", details: error });
    if (result.length === 0) {
      return res
        .status(203)
        .json({ message: "Employees not found", result: [] });
    } else {
      return res.status(200).json({ message: "Success", result: result });
    }
  });
};

export const deleteEmployee = (req, res) => {
  const employeeId = req.params.id;
  const sql = "Delete FROM employees WHERE employeeId = ?";
  conn.query(sql, [employeeId], (error, result) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error in SQL query", details: error });
    return res.status(200).json({ message: "Employee successfully deleted" });
  });
};

export const getEmployee = (req, res) => {
  const employeeId = req.params.id;
  const sql = "SELECT * FROM employees WHERE employeeId = ?";
  conn.query(sql, [employeeId], (error, result) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Error in SQL query", details: error });
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Employee not found", details: error });
    } else {
      res.status(200).json({ message: "Success", result: result[0] });
    }
  });
};

export const editEmployee = (req, res) => {
  const employeeId = req.params.id;
  const sql =
    "UPDATE employees SET firstName=?, lastName=?, email=?, address=?, image=? WHERE employeeId=?";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.address,
    req.file.originalname,
    employeeId,
  ];

  conn.query(sql, values, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Update employee error in SQL", details: error });
    }
    return res
      .status(201)
      .json({ message: "Employee successfully updated", result: result });
  });
};

export const employeeCount = (req, res) => {
  const sql = "SELECT COUNT(employeeId) AS employee FROM employees";
  conn.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else if (result.length === 0) {
      return res.status(400).json({ message: "Employees not found" });
    } else {
      return res.status(200).json({ message: "Success", result: result });
    }
  });
};
