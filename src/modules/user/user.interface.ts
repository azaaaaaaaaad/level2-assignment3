// name: string – The full name of the user.
// email: string – The email address of the user, used for authentication and communication.
// password: string – The password for the user, securely stored.
// role: "admin" | "user" – The role of the user, determining their access level. Default is "user".
// isBlocked: boolean – A flag indicating whether the user is blocked or not. Default is false.
// createdAt: Date – The timestamp when the user was created.
// updatedAt: Date – The timestamp of the last update to the user.

import { USER_ROLE } from "./user.constant"

export interface TUser {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isBlocked: boolean
  createdAt: Date
  updatedAt: Date
}

export type TUserRole = keyof typeof USER_ROLE;