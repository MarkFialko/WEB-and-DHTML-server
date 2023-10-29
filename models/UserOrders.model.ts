import { model, Schema } from 'mongoose'

export interface IUserOrder {
  user: {},
  order: {}
}

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
