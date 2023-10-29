import { model, Schema } from 'mongoose'

export interface IBasketDish {
  basket: {},
  dish: {}
}

const BasketDishModel = new Schema<IBasketDish>({
  basket: {
    type: Schema.Types.ObjectId,
    ref: 'Basket'
  },
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish'
  }
})

export default model('BasketDish', BasketDishModel)
