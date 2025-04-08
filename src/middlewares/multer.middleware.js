// src/middlewares/multer.middleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

// ensure directory exists
const tempDir = path.resolve("public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({
  storage: storage,
});
