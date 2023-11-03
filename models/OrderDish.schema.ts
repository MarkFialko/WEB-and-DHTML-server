import { Document, model, Schema } from 'mongoose'
import { DishDocument } from './Dish.schema'
import { BasketDocument } from './Basket.schema'
import { OrderDocument } from './Order.schema'

export interface IOrderDish {
  order: OrderDocument
  basket: BasketDocument
  dish: DishDocument
  count: number
}

export interface OrderDishDocument extends IOrderDish, Document {}

const OrderDish = new Schema<IOrderDish>({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  basket: {
    type: Schema.Types.ObjectId,
    ref: 'Basket'
  },
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish'
  },
  count: {
    type: Number
  }
})

export default model<IOrderDish>('OrderDish', OrderDish)
