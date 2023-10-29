import BasketDishModel from '../models/BasketDish.model'
import BasketModel from '../models/Basket.model'

class BasketService {
  async getAll(userId: string) {
    const userBasket = await BasketModel.findOne({
      user: userId
    })

    const allFromBaskets = await BasketDishModel.find({
      basket: userBasket._id
    })

    return allFromBaskets
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
