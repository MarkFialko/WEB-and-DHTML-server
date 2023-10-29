import { NextFunction, Request, Response } from 'express'
import OrderService from '../service/Order.service'

class BasketController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const dishesInBasket = await OrderService.getAll(userId)

      return res.json(dishesInBasket)
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id

    const order = await OrderService.create(userId)

    return res.json(order)
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id

    const order = await OrderService.create(userId)

    return res.json(order)
  }

  async update(req:Request, res:Response, next:NextFunction) {
    const userId = req.user.id

    const { orderId } = req.body

    const updatedOrder = await OrderService.update(userId,orderId)

    res.json(updatedOrder)

  }

}

export default new BasketController()
