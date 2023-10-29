import Router from 'express'
import AuthController from '../controllers/AuthController'
import RoleModel, { IRole, Roles } from '../models/Role.model'
import { HydratedDocument } from 'mongoose'

// @ts-ignore
const router = new Router()

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

router.post('/registration', AuthController.registration)

router.post('/login', AuthController.login)

router.get('/refresh', AuthController.refresh)

router.post('/logout', AuthController.logout)

export default router
