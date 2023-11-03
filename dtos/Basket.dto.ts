import { Types } from 'mongoose'
import { DishDTO } from './Dish.dto'

export class BasketDishDto {
  public dish: DishDTO
  public count: number

  constructor(dish: DishDTO, count: number) {
    this.dish = dish
    this.count = count
  }
}

export class BasketDto {
  public id: Types.ObjectId
  public dishes: BasketDishDto[]

  constructor(basketId: Types.ObjectId, dishes: BasketDishDto[]) {
    this.id = basketId
    this.dishes = dishes
  }
}
