import { model, Schema } from 'mongoose'
import { Roles } from './Role.model'

export interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  roles: Roles[]
}

const UserModel = new Schema<IUser>({
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
      ref: 'Role',
    }
  ]
})

export default model('User', UserModel)
