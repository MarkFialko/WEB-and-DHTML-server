import DishSchema from '../models/Dish.schema'
import { DishDTO } from '../dtos/Dish.dto'
import BasketSchema from '../models/Basket.schema'
import BasketDishSchema from '../models/BasketDish.schema'

class BasketService {
  async getAll(userId: string) {
    const userBasket = await BasketSchema.findOne({
      user: userId
    })

    const allFromBaskets = await BasketDishSchema.find({
      basket: userBasket._id
    })

    const basket = {}

    const dishPromises = allFromBaskets.map(async (basketItem) => {
      const dish = await DishSchema.findById(basketItem.dish)

      const dishDto = new DishDTO(dish)
      basket[dishDto.id] = {
        ...dishDto,
        count: basket[dishDto.id] === undefined ? 0 : basket[dishDto.id].count + 1
      }
    })

    await Promise.all(dishPromises)

    return basket
  }

  async add(userId: string, dishId: string[]) {
    const userBasket = await BasketModel.findOne({
      user: userId
    })

    await BasketDishSchema.insertMany(
      dishId.map((curDishId) => ({
        basket: userBasket._id,
        dish: curDishId
      }))
    )

    const dishesInUserBasket = await new BasketService().getAll(userId)

    return dishesInUserBasket
  }

  async delete(userId: string, dishId: string[]) {
    const userBasket = await BasketSchema.findOne({
      user: userId
    })

    await BasketDishModel.deleteOne({
      basket: userBasket._id,
      dish: dishId
    })

    const dishesInUserBasket = await new BasketService().getAll(userId)

    return dishesInUserBasket
  }
}

export default new BasketService()
