import { model, Schema } from 'mongoose'

export enum OrderStatus {
  PENDING = 'Ожидается',
  SUCCESS = 'Завершён'
}

export interface IOrder {
  basket: {}
  status: OrderStatus
}

const OrderSchema = new Schema<IOrder>({
  basket: {
    type: Schema.Types.ObjectId,
    ref: 'Basket'
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING
  }
})

export default model('Order', OrderSchema)
