import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../app/config'

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, 'Please provide your name'] },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid',
      },
      default: 'user',
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const user = this

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

userSchema.post("save", async function (doc, next) {
  doc.password = ''
  next()
})

export const User = model<TUser>('User', userSchema)
