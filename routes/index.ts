import Router from 'express'
import authRouter from './auth.routes'
import dishRouter from './dish.routes'
import basketRouter from './basket.routes'
import orderRouter from './order.routes'
// @ts-ignore
const router = new Router()

router.use('/auth', authRouter)
router.use('/dishes',dishRouter)
router.use('/basket',basketRouter)
router.use('/orders',orderRouter)
export default router
