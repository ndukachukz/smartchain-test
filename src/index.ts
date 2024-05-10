// src/index.ts
import express from "express";
import bodyParser from "body-parser";

import { ensureConnection } from "./utils/db";
import authController from "./controllers/auth.controller";

ensureConnection()
  .then(async (db: any) => {})
  .catch((err) => console.log("DB CONN ERR => ", err));

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.post("/signin", authController.signin);
app.post("/signup", authController.signup);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
