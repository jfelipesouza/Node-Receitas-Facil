import { Request, Response } from 'express'
import { getAllRevenuesInDB } from '../../../services/database/RevenueTableUtils'

export const getAllRevenues = async (req: Request, res: Response) => {
  const { allInformation, initialElement, lastElement } = req.body

  const revenues = await getAllRevenuesInDB(
    allInformation,
    initialElement,
    lastElement
  )
  if (revenues)
    return res.send({ revenues, count: revenues.length }).status(200)

  return res.send({ message: 'Falha ao buscar' }).status(404)
}
