import { model, Schema, Types, Document } from 'mongoose'

export enum OrderStatus {
  PENDING = 'Ожидается',
  SUCCESS = 'Завершён'
}

export interface IOrder {
  basket: Types.ObjectId
  status: OrderStatus
}

export interface OrderDocument extends IOrder, Document {}

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

export default model<IOrder>('Order', OrderSchema)
