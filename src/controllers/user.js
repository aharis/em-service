import conn from "../config/db.js";

export const getUsers = (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    conn.query(sql, (error, result) => {
      if (error) return res.status(500).json({ message: "Internal server error" });
      if (result.length === 0) {
        return res.status(200).json({ message: "Users do not exist in the database"})
      } else {
        return res.status(200).json({ message: "Success", Result: result });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
