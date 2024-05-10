require("@abtnode/mongoose-nedb").install();

import os from "os";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

mongoose.set("debug", true);
mongoose.Promise = Promise;

const dbPath = path.join(os.tmpdir(), "nedb");
fs.mkdirSync(dbPath, { recursive: true });

export const ensureConnection = () => {
  return new Promise((resolve, reject) => {
    // This is needed
    mongoose.connect("mongodb://localhost/test", { dbPath });
    const db = mongoose.connection;
    db.on("error", (err: any) => {
      console.error.bind(console, "connection error:");
      reject(err);
    });
    db.once("open", async () => {
      console.log("connected", dbPath);
      resolve(db);
    });
  });
};
