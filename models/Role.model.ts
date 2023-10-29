import { model, Schema } from 'mongoose'

export enum Roles {
  ADMIN = 'Администратор',
  USER = 'Пользователь',
  WAITER = 'Официант'
}

export interface IRole {
  role: Roles
}

const RoleModel = new Schema<IRole>({
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.USER
  }
})

export default model('Role', RoleModel)
