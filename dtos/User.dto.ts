import { Roles } from '../models/Role.schema'

export class UserDto {
  public email: string
  public id: string
  public roles: Roles[]

  constructor(model: any) {
    this.email = model.email
    this.id = model._id
    this.roles = model.roles
  }
}
