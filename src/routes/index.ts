import { Request, Response, Router } from 'express'
import { usersRouters } from './users'
import { uploadRouters } from './upload'

const router = Router()
const port = process.env.PORT || 3001

router.use('/users', usersRouters)
router.use('/upload', uploadRouters)
router.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    status: 'Application is Running',
    port
  })
})

export { router }
