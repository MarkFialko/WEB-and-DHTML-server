import OrderSchema, { IOrder, OrderDocument, OrderStatus } from '../models/Order.schema'
import { HydratedDocument } from 'mongoose'
import BasketService from './Basket.service'
import OrderDishSchema from '../models/OrderDish.schema'
import BasketDishSchema from '../models/BasketDish.schema'
import UserOrderSchema from '../models/UserOrder.schema'
import BasketSchema, { BasketDocument } from '../models/Basket.schema'

class OrderService {
  async getAll() {
    const orders = await OrderSchema.find({})

    const resultOrders = [] as any[]

    await Promise.all(
      orders.map(async (order) => {
        const fullOrder = {
          order: order._id,
          basket: order.basket,
          dishes: [],
          status: order.status
        } as any
        const orderDishes = await OrderDishSchema.find({
          order: order._id
        })

        await Promise.all(
          orderDishes.map(async (orderDish) => {
            fullOrder.dishes.push(await orderDish.populate('dish'))
          })
        )

        resultOrders.push(fullOrder)
      })
    )

    return resultOrders
  }

  async create(userId: string) {
    const basketDishes = await BasketService.getAll(userId)

    const order: HydratedDocument<IOrder> = new OrderSchema({
      basket: basketDishes.basket,
      status: OrderStatus.PENDING
    })

    await order.save()

    await OrderDishSchema.insertMany(
      basketDishes.dishes.map((basketDish) => {
        return {
          order: order._id,
          basket: basketDishes.basket,
          dish: basketDish.dish.id,
          count: basketDish.count
        }
      })
    )

    await BasketDishSchema.updateMany(
      {
        basket: basketDishes.basket
      },
      {
        $set: {
          status: OrderStatus.SUCCESS
        }
      }
    )

    return {
      id: order._id,
      status: order.status,
      dishes: basketDishes.dishes
    }
  }

  async update(userId: string, orderId: string) {
    const order = (await OrderSchema.findOne({
      _id: orderId
    })) as OrderDocument

    const completedUserOrder = new UserOrderSchema({
      user: userId,
      order: orderId
    })

    await completedUserOrder.save()

    order.status = OrderStatus.SUCCESS

    await order.save()

    return {
      // true
    }
  }

  async getUserOrders(userId: string) {
    const userBasket = (await BasketSchema.findOne({
      user: userId
    })) as BasketDocument

    const orders = await OrderSchema.find({
      basket: userBasket._id
    })

    const resultOrders = [] as any[]

    await Promise.all(
      orders.map(async (order) => {
        const fullOrder = {
          order: order._id,
          basket: order.basket,
          dishes: [],
          status: order.status
        } as any
        const orderDishes = await OrderDishSchema.find({
          order: order._id
        })

        await Promise.all(
          orderDishes.map(async (orderDish) => {
            fullOrder.dishes.push(await orderDish.populate('dish'))
          })
        )

        resultOrders.push(fullOrder)
      })
    )

    return resultOrders
  }

  async getCompletedOrders(userId: string) {}
}

export default new OrderService()
