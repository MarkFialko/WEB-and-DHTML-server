import { NextFunction, Request, Response } from 'express'
import tokenService from '../service/Token.service'
import ApiError from '../exceptions/api.error'
import { UserRequest } from '../types/UseRequest'
import { UserDto } from '../dtos/User.dto'

const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    // Bearer <accessToken>
    const accessToken = authorizationHeader.split(' ')[1]

    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = tokenService.validateAccessToken(accessToken)

    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    req.user = userData as UserDto
    next()

  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }

}

export default authMiddleware
