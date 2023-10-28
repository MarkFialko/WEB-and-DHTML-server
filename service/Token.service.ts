import jwt from 'jsonwebtoken'
import TokenModel, { IToken } from '../models/Token.model'
import { HydratedDocument } from 'mongoose'

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '24h' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '30d' })

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)

      return userData
    } catch (e) {
      return null
    }

  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)

      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(userId: any, refreshToken: string) {
    const tokenData: HydratedDocument<IToken> | null = await TokenModel.findOne({
      user: userId
    })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token: HydratedDocument<IToken> = new TokenModel({
      user: userId,
      refreshToken: refreshToken
    })

    await token.save()

    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteOne({
      refreshToken: refreshToken
    })

    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      refreshToken: refreshToken
    })

    return tokenData
  }
}

export default new TokenService()
