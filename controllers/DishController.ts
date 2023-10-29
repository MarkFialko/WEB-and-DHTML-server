import { NextFunction, Request, Response } from 'express'
import DishService from '../service/Dish.service'

class DishController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, description, image } = req.body
      const dishData = await DishService.create(name, price, description, image)

      return res.json(dishData)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const dishData = await DishService.getAll()

      return res.json(dishData)

    } catch (e) {
      next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {

      const dishId = req.params.id

      const dish = await DishService.getOne(dishId)

      return res.json(dish)

    } catch (e) {
      next(e)
    }
  }

  // async updateOne(req: Request, res: Response, next: NextFunction) {
  //   try {
  //   } catch (e) {
  //     next(e)
  //   }
  // }
  //
  // async deleteOne(req: Request, res: Response, next: NextFunction) {
  //   try {
  //   } catch (e) {
  //     next(e)
  //   }
  // }
}

export default new DishController()
