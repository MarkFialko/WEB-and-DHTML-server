import { NextFunction, Request, Response } from 'express'
import OrderService from '../service/Order.service'
import { UserRequest } from '../types/UseRequest'

class BasketController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const dishesInBasket = await OrderService.getAll()

      return res.json(dishesInBasket)
    } catch (e) {
      next(e)
    }
  }

  async create(req: UserRequest, res: Response, next: NextFunction) {
    const userId = req.user.id

    const order = await OrderService.create(userId as unknown as string)

    return res.json(order)
  }


  async update(req: UserRequest, res: Response, next: NextFunction) {
    const userId = req.user.id

    const { orderId } = req.body

    const updatedOrder = await OrderService.update(userId as unknown as string, orderId)

    res.json(updatedOrder)
  }

  async getOrdersByUser(req: UserRequest, res: Response, next: NextFunction) {
    const userId = req.user.id

    const orders = await OrderService.getOrdersByUser(userId as unknown as string)

    res.json(orders)
  }

  async getOrdered(req: UserRequest, res: Response, next: NextFunction) {
    const userId = req.user.id

    const orders = await OrderService.getOrdered(userId as unknown as string)

    res.json(orders)
  }

}

export default new BasketController()
