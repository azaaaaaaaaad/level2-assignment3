import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";

const authRoute = Router();

authRoute.post(
  "/register",
  validateRequest(userValidation.userValidationSchema),
  AuthController.register,
);

authRoute.post('/login', validateRequest(AuthValidation.loginValidationSchema),AuthController.login)

export default authRoute;
