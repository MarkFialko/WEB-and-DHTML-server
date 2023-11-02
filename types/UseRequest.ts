import { Request } from 'express'
import { UserDto } from '../dtos/User.dto'

export interface UserRequest extends Request{
  user: UserDto
}
