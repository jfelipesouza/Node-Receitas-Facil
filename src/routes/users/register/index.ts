import { Request, Response } from 'express'
import { hash } from 'bcryptjs'

import { UserDTO } from '../../../@types/user'
import {
  createNewUser,
  getUserByEmail
} from '../../../services/database/UserTableUtils'

export const userRegister = async (req: Request, res: Response) => {
  const { email, password }: UserDTO = req.body

  if (email && password) {
    const findUser = await getUserByEmail(email, false)

    if (findUser?.user) {
      return res.status(400).send({ message: 'Usuario existente' })
    }

    const passwordHash = await hash(password, 10)
    const user = await createNewUser({ email, password: passwordHash })

    return res.status(201).send({ message: 'created', user })
  }
  return res.status(400).send({ message: 'Requisição invalida' })
}
