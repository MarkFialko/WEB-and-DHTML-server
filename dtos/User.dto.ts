export class UserDto {
  public email: string
  public id: string

  constructor(model: any) {
    this.email = model.email
    this.id = model._id
  }
}
