import { prismaClientDatabase } from '../prisma'

type GetRevenueByCategoryParams = {
  name: string
  start: number
  end: number
}

export const getAllCategory = async () => {
  try {
    const categories = await prismaClientDatabase.category.findMany({
      select: {
        id: true,
        name: true
      }
    })
    return categories
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

export const getRevenuesByCategory = async (
  data: GetRevenueByCategoryParams
) => {
  try {
    const revenues = await prismaClientDatabase.category.findFirst({
      where: {
        name: data.name
      },
      select: {
        revenues: {
          select: {
            id: true,
            foodName: true,
            image: { select: { id: true, mimeType: true, file: true } }
          },
          skip: data.start,
          take: data.end
        }
      }
    })

    return revenues?.revenues
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

export const createCategoryInDB = async (name: string) => {
  try {
    const findCategory = await prismaClientDatabase.category.findFirst({
      where: { name: name }
    })
    if (findCategory) {
      return { message: 'Categoria existente' }
    }
    const categorie = await prismaClientDatabase.category.create({
      data: {
        name
      }
    })
    return { categorie }
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}
