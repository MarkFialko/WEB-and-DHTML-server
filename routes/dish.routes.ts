import Router from 'express'
import DishController from '../controllers/DishController'
import roleMiddleware from '../middlewares/role.middleware'
import { Roles } from '../models/Role.model'

// @ts-ignore
const router = new Router()


router.post('',roleMiddleware([Roles.ADMIN]), DishController.create)
router.get('', DishController.getAll)
router.get('/:id', DishController.getOne)
// router.delete('/:id', DishController.deleteOne)
// router.patch('/:id', DishController.updateOne)

export default router
