import { Request, Response } from 'express'
import { getRevenueById } from '../../../services/database/RevenueTableUtils'

export const getRevenueByID = async (req: Request, res: Response) => {
  const { id } = req.body
  const revenue = await getRevenueById(id)
  if (revenue) {
    return res.send({ revenue })
  }
  return res.status(400).send({ message: 'Chamada incorreta' })
}
