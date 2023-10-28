import Router from 'express'
import authRouter from './auth.routes'

// @ts-ignore
const router = new Router()

router.use('/auth', authRouter)

export default router
