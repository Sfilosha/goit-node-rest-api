import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  authLoginSchema,
  authRegisterSchema,
  authVerifySchema,
} from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  authControllers.loginController
);

authRouter.get("/current", authenticate, authControllers.getCurrentController);

authRouter.get("/verify/:verificationToken", authControllers.verifyController);

authRouter.post(
  "/verify",
  validateBody(authVerifySchema),
  authControllers.resendVerifyEmailController
);

authRouter.post("/logout", authenticate, authControllers.logoutController);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatarController
);

export default authRouter;
