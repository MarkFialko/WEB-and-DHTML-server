import Router from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import OrderController from '../controllers/OrderController'
import roleMiddleware from '../middlewares/role.middleware'
import { Roles } from '../models/Role.schema'

// @ts-ignore
const router = new Router()

// show all orders to admin and waiters
router.get('', authMiddleware, roleMiddleware([Roles.WAITER, Roles.ADMIN]), OrderController.getAll)

// create order from common user
router.post('', authMiddleware, OrderController.create)

// completer order
router.patch('', authMiddleware,roleMiddleware([Roles.WAITER,Roles.ADMIN]), OrderController.update)

// check my orders
router.get('/me', authMiddleware,roleMiddleware([Roles.WAITER,Roles.ADMIN]), OrderController.getOrdersByUser)

export default router
