import { Roles } from '../models/Role.schema'
import { UserDocument } from '../models/User.schema'
import { Types } from 'mongoose'

export class UserDto {
  public email: string
  public id: Types.ObjectId
  public roles: Roles[]
  public firstName: string
  public lastName: string

  constructor(model: UserDocument) {
    this.email = model.email
    this.id = model._id
    this.roles = model.roles
    this.firstName = model.firstName
    this.lastName = model.lastName
  }
}
