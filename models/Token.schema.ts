import { Document, model, Schema, Types } from 'mongoose'
import { UserDocument } from './User.schema'

export interface IToken {
  user: UserDocument
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
