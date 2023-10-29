import Router from 'express'
import authRouter from './auth.routes'
import dishRouter from './dish.routes'
import basketRouter from './basket.routes'
// @ts-ignore
const router = new Router()

router.use('/auth', authRouter)
router.use('/dishes',dishRouter)
router.use('/basket',basketRouter)
export default router
