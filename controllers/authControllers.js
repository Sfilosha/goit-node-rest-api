import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

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

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
};
