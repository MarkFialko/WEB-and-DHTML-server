import { HydratedDocument } from 'mongoose'
import ApiError from '../exceptions/api.error'
import DishSchema, { IDish } from '../models/Dish.schema'
import { DishDTO } from '../dtos/Dish.dto'

class DishService {
  async create(name: string, price: number, description: string, image: string) {
    const dishToFind = await DishSchema.findOne({
      name: name
    })

    if (dishToFind) {
      throw ApiError.BadRequest(`Dish with name: ${name} already exist`)
    }

    const dish: HydratedDocument<IDish> = new DishSchema({
      name: name,
      price: price,
      description: description,
      image: image
    })

    await dish.save()

    const dishDto = new DishDTO(dish)

    return {
      dish: dishDto
    }
  }

  async getAll() {
    const dishes = await DishSchema.find()

    return {
      dishes: dishes
    }
  }

  async getOne(dishId: string) {
    try {
      const dish = await DishSchema.findById(dishId)

      return {
        dish: dish
      }
    } catch (e) {
      throw ApiError.BadRequest('Incorrect dishes id')
    }
  }
}

export default new DishService()
