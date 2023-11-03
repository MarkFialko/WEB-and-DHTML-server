import { model, Schema, Types, Document } from 'mongoose'
import { UserDocument } from './User.schema'

export interface IBasket {
  user: UserDocument
}

export interface BasketDocument extends IBasket, Document {}

const BasketSchema = new Schema<IBasket>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

export default model<IBasket>('Basket', BasketSchema)
