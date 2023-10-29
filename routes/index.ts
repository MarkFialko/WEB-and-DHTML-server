import Router from 'express'
import authRouter from './auth.routes'
import dishRouter from './dish.routes'
// @ts-ignore
const router = new Router()

router.use('/auth', authRouter)
router.use('/dishes',dishRouter)

export default router
