import { Request, Response } from 'express'
import UserService from '../service/User.service'

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const userData = await UserService.registration(email, password)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {}
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const userData = await UserService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {}
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies
      const userData = await UserService.refresh(refreshToken)

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {}
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logout(refreshToken)

      res.clearCookie('refreshToken')

      return res.json(token)
    } catch (e) {}
  }
}

export default new AuthController()
