import Router from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import OrderController from '../controllers/OrderController'
import roleMiddleware from '../middlewares/role.middleware'
import { Roles } from '../models/Role.model'

// @ts-ignore
const router = new Router()

// show active orders to admin and waiters
router.get('', authMiddleware, roleMiddleware([Roles.WAITER, Roles.ADMIN]), OrderController.getAll)

// create order from common user
router.post('', authMiddleware, OrderController.create)

router.patch('', authMiddleware,roleMiddleware([Roles.WAITER,Roles.ADMIN]), OrderController.update)

export default router
