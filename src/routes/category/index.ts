import { Request, Response, Router } from 'express'
import { getAllCategory } from '../../services/database/CategoryTableUtils'
import { getAllRevenuesByCategory } from './getRevenuesByCategory'
import { createNewCategory } from './createNewCategory'

const categoryRouters = Router()

// Get Routers
categoryRouters.get('/', async (req: Request, res: Response) => {
  return res.send({ categories: await getAllCategory() }).status(200)
})
categoryRouters.get('/revenues', getAllRevenuesByCategory)

// Create Routers
categoryRouters.post('/', createNewCategory)

export { categoryRouters }
