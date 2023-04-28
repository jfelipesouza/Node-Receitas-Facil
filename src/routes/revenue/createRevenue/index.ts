import { Request, Response } from 'express'
import { CreateRevenue } from '../../../@types/Revenue'
import { createRevenueInDB } from '../../../services/database/RevenueTableUtils'

export const createRevenue = async (req: Request, res: Response) => {
  const {
    calories,
    category,
    foodDescription,
    foodName,
    image,
    ingredients,
    portions,
    preparation,
    preparationTime,
    profile
  }: CreateRevenue = req.body

  const data = {
    calories,
    category: category.map(e => e.toUpperCase()),
    foodDescription,
    foodName,
    image,
    ingredients,
    portions,
    preparation,
    preparationTime,
    profile
  }

  const revenue = await createRevenueInDB(data)

  return res.status(201).send({ revenue })
}
