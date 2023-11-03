import BasketSchema, { BasketDocument } from '../models/Basket.schema'
import BasketDishSchema, { IBasketDishDocument } from '../models/BasketDish.schema'
import { OrderStatus } from '../models/Order.schema'
import { BasketDishDto } from '../dtos/Basket.dto'
import { DishDTO } from '../dtos/Dish.dto'
import { Types } from 'mongoose'

export interface BasketResponse {
  basket: Types.ObjectId
  dishes: BasketDishDto[]
}

class BasketService {
  async getAll(userId: string): Promise<BasketResponse> {
    const userBasket = (await BasketSchema.findOne({
      user: userId
    })) as BasketDocument

    const notOrderedBasketDishes = (await BasketDishSchema.find({
      basket: userBasket._id,
      status: OrderStatus.PENDING
    }).populate('dish')) as IBasketDishDocument[]

    type dishId = string

    const basketDishesCount: Map<dishId, number> = new Map()

    const resultDishes: DishDTO[] = []

    notOrderedBasketDishes.map((basketDish) => {
      const dishDto = new DishDTO(basketDish.dish)

      const dishDtoCount = basketDishesCount.get(dishDto.id)

      if (!dishDtoCount) {
        basketDishesCount.set(dishDto.id, 1)
        resultDishes.push(dishDto)
      } else {
        basketDishesCount.set(dishDto.id, dishDtoCount + 1)
      }
    })

    return {
      basket: userBasket._id,
      dishes: resultDishes.map((dish) => {
        return {
          dish,
          count: basketDishesCount.get(dish.id) as number
        }
      })
    }
  }

  async add(userId: string, dishId: string[]): Promise<BasketResponse> {
    const userBasket = (await BasketSchema.findOne({
      user: userId
    })) as BasketDocument

    await BasketDishSchema.insertMany(
      dishId.map((curDishId) => ({
        basket: userBasket!._id,
        dish: curDishId,
        status: OrderStatus.PENDING
      }))
    )

    return await new BasketService().getAll(userId)
  }

  async delete(userId: string, dishId: string[]): Promise<BasketResponse> {
    const userBasket = (await BasketSchema.findOne({
      user: userId
    })) as BasketDocument

    await BasketDishSchema.deleteOne({
      basket: userBasket!._id,
      dish: dishId
    })

    return await new BasketService().getAll(userId)
  }
}

export default new BasketService()
