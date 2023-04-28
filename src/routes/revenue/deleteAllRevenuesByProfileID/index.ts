import { Request, Response } from 'express'
import { deleteAllRevenuesByProfileIDInDB } from '../../../services/database/RevenueTableUtils'

const deleteAllRevenuesByProfileID = async (req: Request, res: Response) => {
  const { profileID } = req.body
  const result = await deleteAllRevenuesByProfileIDInDB(profileID)

  if (result?.length === 0)
    return res.status(200).send({ message: 'Receitas deletadas' })
  return res
    .status(400)
    .send({ message: 'Não foi possivel deletar as receitas' })
}

export { deleteAllRevenuesByProfileID }
