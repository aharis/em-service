import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";

const app = express();
dotenv.config();

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DBPASSWORD,
});

conn.connect((error) => {
  if (error) {
    console.log("Database connection error");
  } else {
    console.log("Database successfully connected");
  }
});

conn.once("open", () => {
  console.log("Connected to the database");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
