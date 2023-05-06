import { Request, Response, Router } from 'express'
import { usersRouters } from './users'
import { filesRouters } from './files'
import { revenueRouters } from './revenue'
import { categoryRouters } from './category'
import { restaurantRouters } from './restaurant'

const router = Router()
const port = process.env.PORT || 3001

router.use('/users', usersRouters)
router.use('/category', categoryRouters)
router.use('/revenues', revenueRouters)
router.use('/restaurants', restaurantRouters)
router.use('/files', filesRouters)

router.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    status: 'Application is Running',
    port
  })
})

export { router }
