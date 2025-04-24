import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import fs from "node:fs/promises";
import path from "node:path";

const avatarDir = path.resolve("public", "avatars");

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  return res.status(201).json({
    email: newUser.email,
  });
};

const loginController = async (req, res) => {
  const result = await authServices.loginUser(req.body);
  res.json(result);
};

const getCurrentController = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);
  res.status(204).json();
};

const updateAvatarController = async (req, res) => {
  const { id } = req.user;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { path: oldPath, filename } = req.file;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const newPath = path.join(avatarDir, newFilename);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", newFilename);

  await authServices.updateAvatar(id, avatarURL);

  res.status(200).json({ avatarURL });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
};
