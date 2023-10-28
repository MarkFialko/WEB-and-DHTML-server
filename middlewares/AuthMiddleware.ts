import { NextFunction, Request, Response } from 'express'
import tokenService from '../service/Token.service'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(new Error('Not authorized'))
    }

    // Bearer <accessToken>
    const accessToken = authorizationHeader.split(' ')[1]

    if (!accessToken) {
      return next(new Error('Not authorized'))
    }

    const userData = tokenService.validateAccessToken(accessToken)

    if (!userData) {
      return next(new Error('Not authorized'))
    }

    req.user = userData
    next()

  } catch (e) {
      return next(new Error('Exception'))
  }

}

export default authMiddleware
