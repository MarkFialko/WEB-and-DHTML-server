import Router from 'express'
import AuthController from '../controllers/AuthController'
import AuthMiddleware from '../middlewares/auth.middleware'
import roleMiddleware from '../middlewares/role.middleware'
import { Roles } from '../models/Role.schema'

// @ts-ignore
const router = new Router()

// TODO отдельный эндпоинт для создания ролей
/* create roles */
// router.post('/role',async (req,res) => {
//   const userRole: HydratedDocument<IRole> = new RoleModel({
//     role: Roles.USER
//   })
//
//   const adminRole: HydratedDocument<IRole> = new RoleModel({
//     role: Roles.ADMIN
//   })
//
//   const waiterRole: HydratedDocument<IRole> = new RoleModel({
//     role: Roles.WAITER
//   })
//
//   await userRole.save()
//   await adminRole.save()
//   await waiterRole.save()
//
//   res.json({
//     message:' all good'
//   })
//
// })

router.post('/roles',roleMiddleware([Roles.ADMIN]),AuthController.setRoles)
router.get('/users',AuthMiddleware,roleMiddleware([Roles.ADMIN]),AuthController.getUsers)

router.post('/registration', AuthController.registration)

router.post('/login', AuthController.login)

router.get('/refresh', AuthController.refresh)

router.delete('/roles',roleMiddleware([Roles.ADMIN]),AuthController.deleteRole)

router.get('/me',AuthMiddleware, AuthController.getMe)

router.post('/logout', AuthController.logout)

export default router
