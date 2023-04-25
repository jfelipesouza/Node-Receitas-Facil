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

  const revenue = await createRevenueInDB({
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
  })
  return res.send({ revenue: revenue?.revenue })
}
