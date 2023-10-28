import Router from 'express'
import AuthController from '../controllers/AuthController'

// @ts-ignore
const router = new Router()

router.post('/registration', AuthController.registration)

router.post('/login', AuthController.login)

router.get('/refresh', AuthController.refresh)

router.post('/logout', AuthController.logout)

export default router
