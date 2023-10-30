import { model, Schema } from 'mongoose'

export interface IBasket {
  user: {}
}

const BasketSchema = new Schema<IBasket>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

export default model('Basket', BasketSchema)
