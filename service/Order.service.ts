import BasketSchema from '../models/Basket.schema'
import OrderSchema, { IOrder, OrderStatus } from '../models/Order.schema'
import UserOrderSchema from '../models/UserOrder.schema'
import { HydratedDocument } from 'mongoose'

class BasketService {
  async getAll() {
    const orders = await OrderSchema.find({})

    return orders
  }

  async create(userId: string) {
    const userBasket = await BasketSchema.findOne({
      user: userId
    })

    const order = new OrderSchema({
      basket: userBasket._id,
      status: OrderStatus.PENDING
    })

    order.save()

    return order
  }

  async update(userId: string, orderId: string) {
    const order: HydratedDocument<IOrder> = await OrderSchema.findById(orderId)

    order.status = OrderStatus.SUCCESS

    order.save()

    const userOrder = new UserOrder({
      user: userId,
      order: order._id
    })

    userOrder.save()

    return userOrder
  }

  async getOrdersByUser(userId: string) {
    const orders = await UserOrderSchema.find({
      user: userId
    })

    return orders
  }
}

export default new BasketService()
