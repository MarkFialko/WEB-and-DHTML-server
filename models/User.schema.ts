import { Document, model, Schema } from 'mongoose'
import { Roles } from './Role.schema'

export interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  roles: Roles[]
}

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      type: String,
      ref: 'Role'
    }
  ]
})

export default model<IUser>('User', UserSchema)
