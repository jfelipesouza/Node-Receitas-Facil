import { prismaClientDatabase } from '../prisma'

import { UserDTO } from '../../../@types/user'
import { ProfileDTO } from '../../../@types/profile'

const getAllUsers = async (allInformation: boolean) => {
  try {
    const users = await prismaClientDatabase.user.findMany({
      select: {
        id: true,
        email: true,
        profile: allInformation,
        createAt: true
      }
    })
    return { users }
  } catch (e) {
    console.log(e)
  }
  return null
}

const getUserByEmail = async (email: string, allInformation: boolean) => {
  try {
    const findUser = await prismaClientDatabase.user.findFirst({
      where: {
        email: email
      },
      select: { profile: allInformation, password: allInformation, id: true }
    })
    if (findUser) {
      return { user: findUser }
    } else {
      return null
    }
  } catch (e) {
    console.log(e)
  }
  return null
}

const createNewUser = async ({ email, password }: UserDTO) => {
  try {
    const user = await prismaClientDatabase.user.create({
      data: {
        email,
        password,
        profile: {
          create: {
            image: '',
            nickname: 'Desconhecido',
            description: 'Olá! Sou novo aqui'
          }
        }
      }
    })

    return { user }
  } catch (e) {
    console.log(e)
  }
  return null
}

const updateProfileInformation = async ({
  description,
  id,
  image,
  nickname
}: ProfileDTO) => {
  try {
    const profile = await prismaClientDatabase.profile.update({
      where: {
        id: id
      },
      data: {
        description,
        image,
        nickname
      }
    })
    return { profile }
  } catch (e) {
    console.log(e)
  }
  return null
}

const deleteUserById = async (id: string) => {
  try {
    const findUser = await prismaClientDatabase.user.findFirst({
      where: { id }
    })

    if (findUser) {
      await prismaClientDatabase.user.delete({
        where: { id },
        include: { profile: { include: { posts: true } } }
      })
      return { message: 'Success' }
    }

    return { message: 'User not found' }
  } catch (e) {
    console.log(e)
    return { message: 'Failed' }
  }
}

export {
  getAllUsers,
  getUserByEmail,
  createNewUser,
  updateProfileInformation,
  deleteUserById
}
