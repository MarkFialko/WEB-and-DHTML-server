import User from '../models/User.model'
import UserModel, { IUser } from '../models/User.model'
import bcrypt from 'bcryptjs'
import { HydratedDocument } from 'mongoose'
import { UserDto } from '../dtos/User.dto'
import TokenService from './Token.service'
import ApiError from '../exceptions/api.error'
import DishModel, { IDish } from '../models/Dish.model'
import { DishDTO } from '../dtos/Dish.dto'

class DishService {
  async create(name: string,price: number,description: string,image: string) {

    const dishToFind = await DishModel.findOne({
      name: name
    })

    if (dishToFind) {
      throw ApiError.BadRequest(`Dish with name: ${name} already exist`)
    }


    const dish: HydratedDocument<IDish> = new DishModel({
      name: name,
      price: price,
      description: description,
      image:image,
    })

    await dish.save()

    const dishDto = new DishDTO(dish)

    return {
      dish: dishDto
    }
  }

  async getAll() {
    const dishes = await DishModel.find()

    return {
      dishes:dishes
    }

  }

  async getOne(dishId: string) {
    try {
      const dish = await DishModel.findById(dishId)

      return {
        dish: dish
      }
    } catch (e) {
      throw ApiError.BadRequest('Incorrect dishes id')
    }
  }

}

export default new DishService()
