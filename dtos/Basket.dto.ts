import { DishDTO } from './Dish.dto'

export class BasketDishDto {
  public dish: DishDTO
  public count: number

  constructor(dish: DishDTO, count: number) {
    this.dish = dish
    this.count = count
  }
}
