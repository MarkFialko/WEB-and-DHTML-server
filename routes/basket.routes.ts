import Router from 'express'
import BasketController from '../controllers/BasketController'
import authMiddleware from '../middlewares/auth.middleware'

// @ts-ignore
const router = new Router()

router.get('', authMiddleware, BasketController.getAll)
router.post('/add', authMiddleware, BasketController.add)
router.delete('/', authMiddleware, BasketController.delete)

export default router
