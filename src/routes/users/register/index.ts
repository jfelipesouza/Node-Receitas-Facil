import { Request, Response } from 'express'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { UserDTO } from '../../../@types/user'
import {
  createNewUser,
  getUserByEmail
} from '../../../services/database/UserTableUtils'

const DECODE_TOKEN = process.env.JWT_CODE

export const userRegister = async (req: Request, res: Response) => {
  const { email, password, nickname }: UserDTO = req.body

  console.log({ email, password, nickname })

  if (email && password && nickname) {
    const findUser = await getUserByEmail(email, false)

    if (findUser?.user) {
      return res.status(200).send({ message: 'Usuario existente' })
    }

    const passwordHash = await hash(password, 10)
    const user = await createNewUser({
      email,
      password: passwordHash,
      nickname
    })

    const token = sign(user!, DECODE_TOKEN!, {
      subject: user!.id,
      expiresIn: '12h'
    })

    return res.status(201).send({ message: 'created', user, token })
  }
  return res.status(400).send({ message: 'Requisição invalida' })
}
