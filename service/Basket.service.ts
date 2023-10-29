import BasketDishModel from '../models/BasketDish.model'
import BasketModel from '../models/Basket.model'
import DishModel from '../models/Dish.model'
import { DishDTO } from '../dtos/Dish.dto'

class BasketService {
  async getAll(userId: string) {
    const userBasket = await BasketModel.findOne({
      user: userId
    })

    const allFromBaskets = await BasketDishModel.find({
      basket: userBasket._id
    })

    const basket = {}

    const dishPromises = allFromBaskets.map(async (basketItem) => {
      const dish = await DishModel.findById(basketItem.dish)

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

    await BasketDishModel.insertMany(
      dishId.map((curDishId) => ({
        basket: userBasket._id,
        dish: curDishId
      }))
    )

    const dishesInUserBasket = await new BasketService().getAll(userId)

    return dishesInUserBasket
  }

  async delete(userId: string, dishId: string[]) {
    const userBasket = await BasketModel.findOne({
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
