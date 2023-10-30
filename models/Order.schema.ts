import { Document, model, Schema, Types } from 'mongoose'

export enum OrderStatus {
  PENDING = 'Ожидается',
  SUCCESS = 'Завершён'
}

export interface IOrder {
  basket: Types.ObjectId
  dishes: Types.ObjectId[]
  status: OrderStatus
}

export interface OrderDocument extends IOrder, Document {}

const OrderSchema = new Schema<IOrder>({
  basket: {
    type: Schema.Types.ObjectId,
    ref: 'Basket'
  },
  dishes: [
    {
      type: Types.ObjectId
    }
  ],
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING
  }
})

export default model<IOrder>('Order', OrderSchema)
