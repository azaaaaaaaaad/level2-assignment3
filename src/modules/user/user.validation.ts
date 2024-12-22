import { z } from "zod";

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: "name must be provided and must be a string",
    })
    .min(3)
    .max(20),

  email: z
    .string({
      required_error: "email must be provided and must be a string",
    })
    .email(),

  password: z.string({
    required_error: "password must be provided and must be a string",
  }),

  role: z
    .enum(["admin", "user"], { message: "{VALUE} is not valid" })
    .default("user"), // Role must be either 'admin' or 'user', default is 'user'
  isBlocked: z.boolean().default(false),
});

export const userValidation = {
  userValidationSchema,
};
