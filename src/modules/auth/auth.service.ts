import { StatusCodes } from "http-status-codes";
import AppError from "../../app/errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../app/config";

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "This User is not found");
  }
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.NOT_FOUND, "This User is not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, "This password is not matched");
  }
  const token = jwt.sign(
    { email: user.email, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: "10d" },
  );
  // eslint-disable-next-line no-unused-vars
  const {password, ...remainingData} = user
  return {token, remainingData}
};

export const AuthService = {
  register,
  login,
};
