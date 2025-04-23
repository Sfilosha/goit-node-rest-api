import HttpError from "./HttpError.js";
import jwt from "jsonwebtoken";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "./jwt.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized")); // Authorization header missing
  }
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized")); // Bearer missing
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    next(HttpError(401, error.message));
  }
  const user = await findUser({ email: payload.email });
  if (!user || !user.token) {
    return next(HttpError(401, "Not authorized")); // User not found
  }
  req.user = user;
  next();
};

export default authenticate;
