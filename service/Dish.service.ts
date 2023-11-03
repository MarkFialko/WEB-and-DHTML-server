import { HydratedDocument } from 'mongoose'
import ApiError from '../exceptions/api.error'
import DishSchema, { DishDocument, IDish } from '../models/Dish.schema'
import { DishDTO } from '../dtos/Dish.dto'

export interface DishResponse {
  dishes: DishDTO[]
}

class DishService {
  async create(name: string, price: number, description: string, image: string): Promise<{ dish: DishDTO }> {
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

  async getAll(): Promise<DishResponse> {
    const dishes = (await DishSchema.find()) as DishDocument[]

    const dishDTOS = dishes.map((dish) => new DishDTO(dish))

    return {
      dishes: dishDTOS
    }
  }

  async getOne(dishId: string): Promise<{ dish: DishDTO }> {
    try {
      const dish = (await DishSchema.findById(dishId)) as DishDocument

      return {
        dish: { ...new DishDTO(dish) }
      }
    } catch (e) {
      throw ApiError.BadRequest('Incorrect dishes id')
    }
  }
}

export default new DishService()
