import express from "express";
import dotenv from "dotenv";
import conn from "./config/db.js";
import router from "./routes/index.js";

const app = express();
dotenv.config();

conn.once("open", () => {
  console.log("Connected to the database");
});

app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
