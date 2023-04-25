import { prismaClientDatabase } from '../prisma'

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

export const getCategoryByName = async (
  name: string,
  allInformation: boolean = false
) => {
  try {
    const categorie = await prismaClientDatabase.category.findFirst({
      where: {
        name
      },
      include: {
        revenues: allInformation
      }
    })

    return { categorie }
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}
export const createCategoryInDB = async (name: string) => {
  try {
    const findCategory = await getCategoryByName(name, false)
    if (findCategory?.categorie) {
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
