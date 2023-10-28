import User from '../models/User.model'
import UserModel, { IUser } from '../models/User.model'
import bcrypt from 'bcryptjs'
import { HydratedDocument } from 'mongoose'
import { UserDto } from '../dtos/User.dto'
import TokenService from './Token.service'

// TODO take out user token logic, add error handler


class UserService {
  async registration(email: string, password: string) {
    const candidate = await User.findOne({
      email: email
    })

    if (candidate) {
      throw new Error(`User with email: ${email} already exist`)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user: HydratedDocument<IUser> = new User({
      email: email,
      password: hashedPassword
    })

    await user.save()

    const userDto = new UserDto(user)

    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: UserDto
    }
  }

  async login(email: string, password: string) {
    const user = await User.findOne({
      email: email
    })

    if (!user) {
      throw new Error(`User with this email: ${email} not found`)
    }

    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw new Error(`Incorrect email or password`)
    }

    const userDto = new UserDto(user)

    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('Not authorized')
    }


    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await TokenService.findToken(refreshToken)
    if (!userData || !tokenFromDB) {
      throw new Error('Not authorized')
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)

    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }
}

export default new UserService()
