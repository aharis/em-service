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
      return res.status(400).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "Success", result: result });
    }
  });
};
