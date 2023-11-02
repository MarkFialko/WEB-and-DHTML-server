import { NextFunction, Request, Response } from 'express'
import UserService from '../service/User.service'
import { UserRequest } from '../types/UseRequest'

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName } = req.body

      const userData = await UserService.registration(email, password, firstName, lastName)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const userData = await UserService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const userData = await UserService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logout(refreshToken)

      res.clearCookie('refreshToken')

      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async getMe(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id

      const userData = await UserService.getMe(userId as unknown as string)

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async setRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId,role } = req.body

      const data = await UserService.setRoles(userId,role)

      return res.json(data)
    } catch (e) {
    }
  }

  async getUsers(req: UserRequest, res: Response, next: NextFunction) {
    console.log('getUsrController')
    try {
      const adminId  =req.user.id
      const users = await UserService.getUsers(adminId as unknown as string)

      res.json(users)

    } catch (e) {
        console.log(e,'error')
    }

  }

}

export default new AuthController()
