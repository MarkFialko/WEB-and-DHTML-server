import { model, Schema } from 'mongoose'

export interface IToken {
  user: {}
  refreshToken: string
}

const TokenModel = new Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  }
})

export default model('Token', TokenModel)
