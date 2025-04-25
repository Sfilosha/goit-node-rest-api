import multer from "multer";
import path from "node:path";
import HttpError from "./HttpError.js";

const tempDir = path.resolve("temp"); // Підставляє на початку шляху

export const generateFilename = (originalName, userId = null) => {
  const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = path.extname(originalName);
  const cleanOriginalName = originalName.split(" ").join("");

  if (userId) {
    return `${userId}-avatar-user${ext}`;
  }

  return `${uniquePrefix}_${cleanOriginalName}${ext}`;
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, tempDir);
  },
  filename: (req, file, callback) => {
    const filename = generateFilename(file.originalname);
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return callback(HttpError(400, ".exe files are not supported"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
