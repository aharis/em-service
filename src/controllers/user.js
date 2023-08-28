import conn from "../config/db.js";

export const loginUser = (req, res) => {
  const sql = "SELECT * FROM users Where email = ? AND password = ?";
  conn.query(sql, [req.body.email, req.body.password], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Internal server error" });
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "Success", Result: result });
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
      return res.status(200).json({ message: "Success", Result: result });
    }
  });
};
