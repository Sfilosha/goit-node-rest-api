import User from "../db/models/users.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";
import { generateAvatar } from "../helpers/avatars.js";

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
  const avatarURL = generateAvatar(email);

  const newUser = await User.create({
    ...data,
    password: hashPassword,
    avatarURL,
  });
  return newUser;
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: { email },
  });
  if (!user) {
    throw HttpError(401, "Email or Password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or Password invalid");
  }
  let avatarURL;
  if (!user.avatarURL) {
    avatarURL = generateAvatar(email);
  }
  const token = generateToken({ email });
  await user.update({ token, avatarURL });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });
  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ token: null });
};

export const updateAvatar = async (id, avatarURL) => {
  const user = await findUser({ id });
  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ avatarURL });

  return {
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  };
};
