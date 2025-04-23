import User from "../db/models/users.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { generateToken } from "../helpers/jwt.js";

// const { JWT_SECRET } = process.env;

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const registerUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    throw HttpError(409, "User with this email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...data, password: hashPassword });
  return newUser;
};

export const signinUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or Password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or Password invalid");
  }
  const token = generateToken({ email });
  await user.update({ token });
  //   const token = jwt.sign({ email }, JWT_SECRET, {
  //     expiresIn: "24h",
  //   });
  return { token };
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });
  if (!user || !user.token) {
    throw HttpError(404, "User not found");
  }

  await user.udate({ token: null });
};
