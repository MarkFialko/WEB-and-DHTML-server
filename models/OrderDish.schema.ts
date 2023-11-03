import { Document, model, Schema, Types } from 'mongoose'
import { DishDocument } from './Dish.schema'
import { BasketDocument } from './Basket.schema'

export interface IOrderDish {
  basket: BasketDocument
  dish: DishDocument
  count: number
}

export interface OrderDishDocument extends IOrderDish, Document {}

const OrderDish = new Schema<IOrderDish>({
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
