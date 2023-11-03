import { Document, model, Schema } from 'mongoose'
import { UserDocument } from './User.schema'
import { OrderDocument } from './Order.schema'

export interface IUserOrder {
  user: UserDocument
  order: OrderDocument
}

export interface UserOrderDocument extends Document {}

const UserOrder = new Schema<IUserOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }
})

export default model('UserOrder', UserOrder)
