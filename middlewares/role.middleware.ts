import { NextFunction, Request, Response } from 'express'
import { Roles } from '../models/Role.schema'
import ApiError from '../exceptions/api.error'
import tokenService from '../service/Token.service'

const roleMiddleware = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

      // TODO Пофиксить PAYLOAD при добавлении роли
      const userData: any = tokenService.validateAccessToken(accessToken)

      const { roles: userRoles } = userData

      let hasRole = false

      userRoles.forEach((role: Roles) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        return next(ApiError.NoAccessError())
      }

      next()
    } catch (e) {
      return next(ApiError.UnauthorizedError())
    }
  }
}

export default roleMiddleware

/*
Роли для пользователя:
АДМИН -
  Может добавлять блюда в меню,
  Нанимать сотрудников (предоставлять им роли),
  Удалять сотрудников

ОФИЦИАНТ -
  Может испольнять заказы,
  Увольняться

ПОЛЬЗОВАТЕЛЬ ОБЫЧНЫЙ -
  Может делать заказ,
  Попросить устроиться на работу


Блюда: Название блюда, цена, описание, картинка блюда

Меню: список тех блюд, которое может приготовить ресторан

Заказ: пользователь может заказать блюда

Для неавторизованных пользователей воззможен только просмотр меню и
  главная страница ресторана

 */
