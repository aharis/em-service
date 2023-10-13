import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import conn from "./config/db.js";
import router from "./routes/index.js";

const app = express();
dotenv.config();


conn.once("open", () => {
  console.log("Connected to the database");
});
app.use(cors({
  origin: [process.env.BASE_URL_DEV],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.static("data"))
app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
