import { model, Schema } from 'mongoose'

export interface IDish {
  name: string
  price: number
  description: string
  image: string
}

const DishSchema = new Schema<IDish>({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
})

export default model('Dish', DishSchema)
