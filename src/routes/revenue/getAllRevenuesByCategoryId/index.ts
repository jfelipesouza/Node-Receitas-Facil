import { Request, Response } from 'express'
import { getAllRevenuesByCategoryInDB } from '../../../services/database/RevenueTableUtils'

type Params = {
  name: string
  allInformation: boolean
  start: number
  end: number
}

export const getAllRevenuesByCategory = async (
  req: Request<any, any, any, Params>,
  res: Response
) => {
  const { name, allInformation, start, end } = req.query

  console.log({ name: name.toUpperCase(), allInformation, start, end })

  if (allInformation != null && start != null && end != null && name != null) {
    const revenues = await getAllRevenuesByCategoryInDB({
      allInformation: Boolean(allInformation),
      skip: Number(start),
      take: Number(end),
      name: String(name.toUpperCase())
    })
    if (revenues)
      return res.status(200).send({ revenues, count: revenues.length })
  }

  return res.status(404).send({ message: 'Falha ao buscar' })
}
