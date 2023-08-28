import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DBPASSWORD,
  database: "ems",
  port: 3306,
});

conn.connect(function (error) {
  if (error) {
    console.log("Database connection error", error.message);
  } else {
    console.log("Database successfully connected");
  }
});

export default conn;
