import { NextFunction, Request, Response } from 'express'
import BasketService from '../service/Basket.service'
import { UserRequest } from '../types/UseRequest'

class BasketController {
  async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {

      const userId = req.user.id

        const dishesInBasket = await BasketService.getAll(userId as unknown as string)

        return res.json(dishesInBasket)
    } catch (e) {
      next(e)
    }
  }

  async add(req: UserRequest, res: Response, next: NextFunction) {
    try {

      const userId = req.user.id
      const { dishId } = req.body

      const dishToBasket = await BasketService.add(userId as unknown as string,dishId)


      return res.json(dishToBasket)

    } catch (e) {
      next(e)
    }
  }

  async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id
      const { dishId } = req.body

      const dishToBasket = await BasketService.delete(userId as unknown as string,dishId)


      return res.json(dishToBasket)
    } catch (e) {
      next(e)
    }
  }

}

export default new BasketController()
