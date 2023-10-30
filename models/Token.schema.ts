import { Document, model, Schema, Types } from 'mongoose'

export interface IToken {
  user: Types.ObjectId
  refreshToken: string
}

export interface TokenDocument extends IToken, Document {}

const TokenSchema = new Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  }
})

export default model<IToken>('Token', TokenSchema)
