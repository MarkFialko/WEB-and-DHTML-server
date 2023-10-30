import BasketSchema, { IBasket } from '../models/Basket.schema'
import OrderSchema, { IOrder, OrderStatus } from '../models/Order.schema'
import UserOrderSchema from '../models/UserOrder.schema'
import { Document, HydratedDocument } from 'mongoose'

class BasketService {
  async getAll() {
    const orders: Document<IOrder>[] = await OrderSchema.find({})

    return orders
  }

  async create(userId: string) {
    const userBasket: Document<IBasket> | null = await BasketSchema.findOne({
      user: userId
    })

    if (userBasket) {
      const order = new OrderSchema({
        basket: userBasket._id,
        status: OrderStatus.PENDING
      })

      await order.save()

      return order
    }
  }

  async update(userId: string, orderId: string) {
    const order: HydratedDocument<IOrder> | null = await OrderSchema.findById(orderId)

    if (order) {
      order.status = OrderStatus.SUCCESS

      await order.save()

      const userOrder = new UserOrderSchema({
        user: userId,
        order: order._id
      })

      await userOrder.save()

      return userOrder
    }
  }

  async getOrdersByUser(userId: string) {
    const orders = await UserOrderSchema.find({
      user: userId
    })

    return orders
  }
}

export default new BasketService()
