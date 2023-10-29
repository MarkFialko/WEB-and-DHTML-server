import { NextFunction, Request, Response } from 'express'
import BasketService from '../service/Basket.service'

class BasketController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = req.user.id

        const dishesInBasket = await BasketService.getAll(userId)

        return res.json(dishesInBasket)
    } catch (e) {
      next(e)
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = req.user.id
      const { dishId } = req.body

      const dishToBasket = await BasketService.add(userId,dishId)


      return res.json(dishToBasket)

    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id
      const { dishId } = req.body

      const dishToBasket = await BasketService.delete(userId,dishId)


      return res.json(dishToBasket)
    } catch (e) {
      next(e)
    }
  }

}

export default new BasketController()
