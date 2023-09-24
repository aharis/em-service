import conn from "../config/db.js";
import jwt from "jsonwebtoken";

export const loginUser = (req, res) => {
  const sql = "SELECT * FROM users Where email = ? AND password = ?";
  conn.query(sql, [req.body.email, req.body.password], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Internal server error" });
    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: "User not found or invalid user credentials" });
    } else {
      const userId = result[0].userId;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const response = {
        userId: result[0].userId,
        role: result[0].roles,
        token: token,
      };
      return res.status(200).json({ message: "User loged", result: response });
    }
  });
};

export const getUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  conn.query(sql, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Internal server error" });
    if (result.length === 0) {
      return res.status(400).json({ message: "Users not found" });
    } else {
      return res.status(200).json({ message: "Success", result: result });
    }
  });
};

export const getUser = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE userId = ?";
  conn.query(sql, [userId], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Internal server error" });
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "Success", result: result });
    }
  });
};

export const deleteUser = (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE userId = ?";
  conn.query(sql, [userId], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error in SQL query", details: error });
    }
    return res.status(200).json({ message: "User successfully deleted" });
  });
};

export const adminCount = (req, res) => {
  const sql =
    "SELECT SUM(roles = 'superadmin') AS superadminCount, SUM(roles = 'admin') AS adminCount FROM users";

  conn.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else if (result.length === 0 || result[0].superadminCount === 0) {
      return res.status(400).json({ message: "Superadmins not found" });
    } else {
      return res.status(200).json({
        message: "Success",
        superadmin: result[0].superadminCount,
        admin: result[0].adminCount,
      });
    }
  });
};

export const getAllSalary = (req, res) => {
  const sql =
    "SELECT SUM(salary) AS total_salary FROM (SELECT salary FROM users UNION ALL SELECT salary FROM employees) combined_salaries;";
  conn.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else if (result.length === 0) {
      return res.status(200).json({ message: "No data salary", result: 0 });
    } else {
      return res.json({ message: "Success", result: result[0].total_salary });
    }
  });
};
