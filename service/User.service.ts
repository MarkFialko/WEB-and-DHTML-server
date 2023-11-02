import UserSchema, { IUser, UserDocument } from '../models/User.schema'
import bcrypt from 'bcryptjs'
import { HydratedDocument } from 'mongoose'
import { UserDto } from '../dtos/User.dto'
import TokenService from './Token.service'
import ApiError from '../exceptions/api.error'
import RolesSchema, { RoleDocument, Roles } from '../models/Role.schema'
import BasketSchema, { IBasket } from '../models/Basket.schema'

// TODO take out user token logic

class UserService {
  async registration(email: string, password: string, firstName: string, lastName: string) {
    const candidate: UserDocument | null = await UserSchema.findOne({
      email: email
    })

    if (candidate) {
      throw ApiError.BadRequest(`User with email: ${email} already exist`)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userRole: RoleDocument | null = await RolesSchema.findOne({
      role: Roles.USER
    })

    const adminRole = await RolesSchema.findOne({
      role: Roles.ADMIN
    })

    const user: HydratedDocument<IUser> = new UserSchema({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      roles: [userRole!.role /*, adminRole!.role*/]
    })

    // create basket for user
    const basket: HydratedDocument<IBasket> = new BasketSchema({
      user: user._id
    })

    await user.save()
    await basket.save()

    const userDto = new UserDto(user)

    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: UserDto
    }
  }

  async login(email: string, password: string) {
    const user: UserDocument | null = await UserSchema.findOne({
      email: email
    })

    if (!user) {
      throw ApiError.BadRequest(`User with this email: ${email} not found`)
    }

    const isPassEquals = await bcrypt.compare(password, user.password)

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect email or password`)
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
      throw ApiError.UnauthorizedError()
    }

    const userData = TokenService.validateRefreshToken(refreshToken) as UserDto
    const tokenFromDB = await TokenService.findToken(refreshToken)
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }

    const user: UserDocument | null = await UserSchema.findById(userData.id)

    const userDto = new UserDto(user as UserDocument)

    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }

  async getMe(userId: string) {
    const user: UserDocument | null = await UserSchema.findOne({
      _id: userId
    })

    return new UserDto(user!)
  }

  async setRoles(userId:string, role: string) {
    const bdRole = await RolesSchema.findOne({
        role: role
    })

    const user = await UserSchema.findOne({
      _id: userId
    })
    user!.roles.push(bdRole!.role)

    await user!.save()


    return true
  }

  async getUsers(adminId: string) {
    const users = await UserSchema.find({
      _id: { $ne: adminId }
    })
    return users.map(user=> new UserDto(user))
  }
}

export default new UserService()
