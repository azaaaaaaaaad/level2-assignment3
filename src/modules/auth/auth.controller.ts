import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    message: "user registered successfully",
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    success: true,
    message: "user registered successfully",
    statusCode: StatusCodes.CREATED,
    token: result.token,
    data: result.remainingData,
  });
});

export const AuthController = {
  register,
  login,
};
