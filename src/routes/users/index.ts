import { Request, Response, Router } from 'express'

import { getAllUsers } from '../../services/database/UserTableUtils'
import { userRegister } from './register'
import { updateProfileInformation } from './updateProfileInformations'
import { singINUser } from './login'
import { deleteAccount } from './deleteAccount'

const usersRouters = Router()

type DefaultRouterProps = {
  allInformation: boolean
  initialElement: number
  lastElement: number
}

// Get Routers
usersRouters.get('/', async (req: Request, res: Response) => {
  const { allInformation, initialElement, lastElement }: DefaultRouterProps =
    req.body

  const findUsers = await getAllUsers(
    allInformation,
    initialElement,
    lastElement
  )
  if (findUsers != null) {
    console.log({ users: findUsers.users })
    return res.status(200).send({ ...findUsers })
  } else {
    return res.status(404).send({ message: 'ERROR! Users not found' })
  }
})

// Send Routers
usersRouters.post('/singIN', singINUser)
usersRouters.post('/register', userRegister)

// Update Routers
usersRouters.put('/profile', updateProfileInformation)

// Delete Routers
usersRouters.delete('/', deleteAccount)

export { usersRouters }
