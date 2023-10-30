import { OrderDocument, OrderStatus } from '../models/Order.schema'
import { Types } from 'mongoose'
import { DishDTO } from './Dish.dto'

export class OrderDto {
  public basket: Types.ObjectId
  public id: Types.ObjectId
  public dishes: DishDTO[]
  public status: OrderStatus

  constructor(model: OrderDocument, dishes: DishDTO[]) {
    this.basket = model.basket
    this.id = model._id
    this.dishes = dishes
    this.status = model.status
  }
}
