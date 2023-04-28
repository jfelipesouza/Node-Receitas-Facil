import { Request, Response } from 'express'
import { getAllRevenuesInDB } from '../../../services/database/RevenueTableUtils'

export const getAllRevenues = async (req: Request, res: Response) => {
  const { allInformation, initialElement, lastElement } = req.body
  if (allInformation != null && initialElement != null && lastElement != null) {
    const revenues = await getAllRevenuesInDB(
      allInformation,
      initialElement,
      lastElement
    )
    if (revenues)
      return res.status(200).send({ revenues, count: revenues.length })
  }

  return res.status(404).send({ message: 'Falha ao buscar' })
}
