import BasketSchema, { IBasket } from '../models/Basket.schema'
import OrderSchema, { IOrder, OrderDocument, OrderStatus } from '../models/Order.schema'
import UserOrderSchema from '../models/UserOrder.schema'
import { Document, HydratedDocument } from 'mongoose'
import BasketService from './Basket.service'
import DishSchema, { DishDocument } from '../models/Dish.schema'
import { DishDTO } from '../dtos/Dish.dto'
import { OrderDto } from '../dtos/Order.dto'
import BasketDishSchema from '../models/BasketDish.schema'

class OrderService {
  async getAll() {
    const orders: OrderDocument[] = await OrderSchema.find({})

    const ordersDtos = await Promise.all(
      orders.map(async (order: OrderDocument) => {
        const dishesDTO = await Promise.all(
          order.dishes.map(async (dishId) => {
            const dish = await DishSchema.findOne({
              _id: dishId
            })

            return new DishDTO(dish as DishDocument)
          })
        )

        return new OrderDto(order, dishesDTO)
      })
    )

    return ordersDtos
  }

  async create(userId: string) {
    const userBasket: Document<IBasket> | null = await BasketSchema.findOne({
      user: userId
    })

    const dishes = (await BasketService.getAll(userId)) as any

    if (userBasket) {
      const order = new OrderSchema({
        basket: userBasket._id,
        dishes: Object.keys(dishes)!.map((key: any) => {
          return dishes[key].id
        }),
        status: OrderStatus.PENDING
      })

      await order.save()

      const dishesDTO = await Promise.all(
        order.dishes.map(async (dishId) => {
          const dish = await DishSchema.findOne({
            _id: dishId
          })

          return new DishDTO(dish as DishDocument)
        })
      )

      await BasketDishSchema.deleteMany({
        basket: userBasket._id
      })

      console.log('удалена корзина пользователя')

      return new OrderDto(order, dishesDTO)
    }
  }

  async update(userId: string, orderId: string) {
    const order: HydratedDocument<IOrder> | null = await OrderSchema.findById(orderId)
    console.log('find order', order)
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
    const ordersInUsers = await UserOrderSchema.find({
      user: userId
    })
    const orders = await Promise.all(
      ordersInUsers.map(async (order) => {
        const normalOrder = await OrderSchema.find({ _id: order.order })
        return normalOrder
      })
    )

    const ordersDtos = await Promise.all(
      orders.flat(10).map(async (order: OrderDocument) => {
        const dishesDTO = await Promise.all(
          order.dishes.map(async (dishId) => {
            const dish = await DishSchema.findOne({
              _id: dishId
            })

            return new DishDTO(dish as DishDocument)
          })
        )

        return new OrderDto(order, dishesDTO)
      })
    )

    return ordersDtos
  }
}

export default new OrderService()
