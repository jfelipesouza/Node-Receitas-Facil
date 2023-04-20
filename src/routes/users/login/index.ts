import { Request, Response } from 'express'

import { UserDTO } from '../../../@types/user'
import { getUserByEmail } from '../../../services/database/UserTableUtils'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const DECODE_TOKEN = process.env.JWT_CODE

export const singINUser = async (req: Request, res: Response) => {
  const { email, password }: UserDTO = req.body

  const findUser = await getUserByEmail(email, true)

  if (!findUser) {
    return res.status(404).send('Usuario não encontrado')
  }

  const passwordMatch = await compare(password, findUser.user.password)
  if (!passwordMatch) {
    return res.status(404).send('E-mail ou senha incorretos')
  }

  const token = sign(findUser, DECODE_TOKEN!, {
    subject: findUser.user.id,
    expiresIn: '1h'
  })

  return res.status(200).send({
    message: 'Success',
    token
  })
}
