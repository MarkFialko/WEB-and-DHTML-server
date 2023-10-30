import { BasketDocument } from '../models/Basket.schema'
import { Types } from 'mongoose'

export class BasketDto {
  public user: Types.ObjectId
  public id: Types.ObjectId

  constructor(model: BasketDocument) {
    this.user = model.user
    this.id = model._id
  }
}
