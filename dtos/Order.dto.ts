import { OrderDocument, OrderStatus } from '../models/Order.schema'
import { Types } from 'mongoose'
import { DishDTO } from './Dish.dto'

export class OrderDto {
  public basket: Types.ObjectId
  public id: Types.ObjectId
  public dishes: {
    dish: DishDTO
    count: number
  }[]
  public status: OrderStatus

  constructor(model: OrderDocument, dishes: any) {
    this.basket = model.basket
    this.id = model._id
    this.dishes = dishes
    this.status = model.status
  }
}
