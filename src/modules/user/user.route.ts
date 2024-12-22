import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const userRouter = Router();

userRouter.post('/create-admin', validateRequest(userValidation.userValidationSchema), userController.createUser)
userRouter.get("/",auth(USER_ROLE.admin), userController.getUser);

export default userRouter
