import { Request, Response } from 'express'
import { getRandomRevenuesInDB } from '../../../services/database/RevenueTableUtils'

const getRandomRevenue = async (req: Request, res: Response) => {
  const revenue = await getRandomRevenuesInDB()
  return res.send({ revenue })
}

export { getRandomRevenue }
