import { Request, Response } from 'express'
import { getRevenuesByCategory } from '../../../services/database/CategoryTableUtils'

const getAllRevenuesByCategory = async (req: Request, res: Response) => {
  const { name, start, end } = req.query
  const data = {
    name: String(name).toUpperCase().trim(),
    start: Number(start),
    end: Number(end)
  }
  const revenues = await getRevenuesByCategory(data)
  if (revenues) {
    return res.status(200).send({ revenues })
  }
  return res.status(400).send()
}

export { getAllRevenuesByCategory }
