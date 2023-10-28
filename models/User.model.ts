import { model, Schema } from 'mongoose'

export interface IUser {
  email: string
  password: string
}

const UserModel = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

export default model('User', UserModel)
