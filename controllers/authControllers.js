import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  return res.status(201).json({
    email: newUser.email,
    username: newUser.username,
  });
};

const signinController = async (req, res) => {
  const { token } = await authServices.signinUser(req.body);
  res.json({ token });
};

const getCurrentController = (req, res) => {
  const { email, username } = req.user;
  res.json({
    email,
    username,
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser;
  res.json({
    message: "Logout successfully",
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  signinController: ctrlWrapper(signinController),
  getCurrentController: ctrlWrapper(getCurrentController),
};
