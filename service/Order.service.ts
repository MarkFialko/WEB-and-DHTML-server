import BasketModel from '../models/Basket.model'
import OrderModel, { IOrder, OrderStatus } from '../models/Order.model'
import UserOrder from '../models/UserOrders.model'
import { HydratedDocument } from 'mongoose'

class BasketService {
  async getAll(userId: string) {}

  async create(userId: string) {
    const userBasket = await BasketModel.findOne({
      user: userId
    })

    const order = new OrderModel({
      basket: userBasket._id,
      status: OrderStatus.PENDING
    })

    order.save()

    return order
  }

  async update(userId: string, orderId: string) {

    const order: HydratedDocument<IOrder> = await OrderModel.findById(orderId)

    order.status = OrderStatus.SUCCESS

    order.save()

    const userOrder = new UserOrder({
      user:userId,
      order: order._id
    })

    userOrder.save()

    return userOrder

  }
}

export default new BasketService()
