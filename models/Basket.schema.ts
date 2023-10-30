import { model, Schema, Types, Document } from 'mongoose'

export interface IBasket {
  user: Types.ObjectId
}

export interface BasketDocument extends IBasket, Document {}

const BasketSchema = new Schema<IBasket>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

export default model<IBasket>('Basket', BasketSchema)
