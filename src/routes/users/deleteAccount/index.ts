import { Request, Response } from 'express'
import { deleteUserById } from '../../../services/database/UserTableUtils'

type IDeleteUser = { id: string }

const deleteAccount = async (req: Request, res: Response) => {
  const { id }: IDeleteUser = req.body

  const deleteUser = await deleteUserById(id)
  if (deleteUser) {
    return res.status(200).send({ message: deleteUser?.message })
  }
  return res.status(500).send({ message: 'Falha ao deletar' })
}

export { deleteAccount }
