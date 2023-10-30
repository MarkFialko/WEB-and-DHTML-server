import { Document, model, Schema } from 'mongoose'

export enum Roles {
  ADMIN = 'Администратор',
  USER = 'Пользователь',
  WAITER = 'Официант'
}

export interface IRole {
  role: Roles
}

export interface RoleDocument extends IRole, Document {}

const RoleSchema = new Schema<IRole>({
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.USER
  }
})

export default model<IRole>('Role', RoleSchema)
