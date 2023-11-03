import Router from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import OrderController from '../controllers/OrderController'
import roleMiddleware from '../middlewares/role.middleware'
import { Roles } from '../models/Role.schema'

// @ts-ignore
const router = new Router()

// get all orders to admin and waiters
router.get('', authMiddleware, roleMiddleware([Roles.WAITER, Roles.ADMIN]), OrderController.getAll)

// get all user orders
router.get('/me', authMiddleware, OrderController.getUserOrders)

// create order from common user
router.post('', authMiddleware, OrderController.create)

// complete order for waiter
router.patch(
  '',
  authMiddleware,
  roleMiddleware([Roles.WAITER, Roles.ADMIN]),
  OrderController.update
)

// completed orders for waiter
router.get(
  '/completed',
  authMiddleware,
  roleMiddleware([Roles.WAITER, Roles.ADMIN]),
  OrderController.getCompletedOrders
)

export default router
