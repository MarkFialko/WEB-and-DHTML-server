import { DishDocument } from '../models/Dish.schema'

export class DishDTO {
  public name: string
  public id: string
  public price: number
  public description: string
  public image: string

  constructor(model: DishDocument) {
    this.name = model.name
    this.id = model._id
    this.price = model.price
    this.description = model.description
    this.image = model.image
  }
}
