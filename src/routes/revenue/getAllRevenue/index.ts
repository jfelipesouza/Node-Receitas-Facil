import { Request, Response } from 'express'
import { getAllRevenuesInDB } from '../../../services/database/RevenueTableUtils'

type Params = {
  start: number
  end: number
}

export const getAllRevenues = async (
  req: Request<any, any, any, Params>,
  res: Response
) => {
  const { start, end } = req.query

  if (start != null && end != null) {
    const revenues = await getAllRevenuesInDB(Number(start), Number(end))
    if (revenues) return res.status(200).send({ revenues })
  }

  return res.status(404).send({ message: 'Falha ao buscar' })
}
