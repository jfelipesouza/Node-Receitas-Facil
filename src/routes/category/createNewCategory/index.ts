import { Request, Response } from 'express'
import { createCategoryInDB } from '../../../services/database/CategoryTableUtils'

const createNewCategory = async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body
  const categorie = await createCategoryInDB(name.toUpperCase().trim())
  if (categorie?.categorie) {
    return res.send({ categorie: categorie.categorie }).status(200)
  }
  return res.status(400).send({ message: categorie?.message })
}

export { createNewCategory }
