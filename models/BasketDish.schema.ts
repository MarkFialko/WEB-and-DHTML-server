import { Document, model, Schema } from 'mongoose'
import { OrderStatus } from './Order.schema'
import { DishDocument } from './Dish.schema'
import { BasketDocument } from './Basket.schema'

export interface IBasketDish {
  basket: BasketDocument
  dish: DishDocument
  status: OrderStatus
}

export interface IBasketDishDocument extends IBasketDish, Document {}

const BasketDishSchema = new Schema<IBasketDish>({
  basket: {
    type: Schema.Types.ObjectId,
    ref: 'Basket'
  },
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish'
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus)
  }
})

export default model('BasketDish', BasketDishSchema)
