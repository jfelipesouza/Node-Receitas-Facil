import { Request, Response, Router } from 'express'
import {
  createCategoryInDB,
  getAllCategory,
  getCategoryByName
} from '../../services/database/CategoryTableUtils'

const categoryRouters = Router()

categoryRouters.get('/getByName', async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body
  const categorie = await getCategoryByName(
    name.toLocaleUpperCase().trim(),
    true
  )
  if (categorie?.categorie) {
    return res.send({ categorie: categorie.categorie }).status(200)
  }
  return res.status(404).send({ message: 'not found' })
})

categoryRouters.post('/', async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body
  const categorie = await createCategoryInDB(name.toLocaleUpperCase().trim())
  if (categorie?.categorie) {
    return res.send({ categorie: categorie.categorie }).status(200)
  }
  return res.status(400).send({ message: categorie?.message })
})
categoryRouters.get('/', async (req: Request, res: Response) => {
  const categories = await getAllCategory()
  return res.send({ categories }).status(200)
})

export { categoryRouters }
