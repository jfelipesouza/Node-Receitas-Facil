import { CreateRevenue } from '../../../@types/Revenue'
import { prismaClientDatabase } from '../prisma'

export const createRevenueInDB = async ({
  calories,
  foodDescription,
  foodName,
  image,
  ingredients,
  portions,
  preparation,
  preparationTime,
  profile,
  category
}: CreateRevenue) => {
  try {
    const revenue = await prismaClientDatabase.revenue.create({
      data: {
        calories,
        foodName,
        foodDescription,
        portions,
        preparationTime,
        preparation,
        ingredients,
        image: { connect: { id: image.id } },
        category: { connect: { id: category } },
        profile: { connect: { id: profile.id } }
      }
    })
    return { revenue }
  } catch (error) {
    console.log(error)
  }
}

export const getRevenueById = async (id: string) => {
  try {
    const revenue = await prismaClientDatabase.revenue.findFirst({
      where: {
        id
      },
      include: { image: true }
    })

    if (revenue) {
      console.log(revenue)
      return {
        id: revenue.id,
        foodName: revenue.foodName,
        ingredients: revenue.ingredients,
        preparation: revenue.preparation,
        calories: revenue.calories,
        portions: revenue.portions,
        preparationTime: revenue.preparationTime,
        image: {
          file: revenue.image?.file,
          mimeType: revenue.image?.mimeType
        }
      }
    }
    return null
  } catch (e) {
    console.log(e)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

export const getAllRevenuesInDB = async (
  allInformation: boolean = false,
  skip: number = 0,
  take: number = 10
) => {
  try {
    const revenues = await prismaClientDatabase.revenue.findMany({
      select: {
        id: true,
        foodName: true,
        image: allInformation
          ? { select: { mimeType: allInformation, file: allInformation } }
          : allInformation
      },
      skip,
      take
    })
    if (revenues) {
      return revenues
    }
    return null
  } catch (e) {
    console.log(e)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

export const getAllRevenuesByCategoryInDB = async ({
  id,
  skip,
  take,
  allInformation
}: {
  id: string
  skip: number
  take: number
  allInformation?: boolean
}) => {
  try {
    const revenues = await prismaClientDatabase.revenue.findMany({
      where: {
        categoryId: id
      },
      select: {
        id: true,
        foodName: true,
        image: allInformation
          ? { select: { mimeType: allInformation, file: allInformation } }
          : allInformation
      },
      skip,
      take
    })
    return revenues
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

export const deleteAllRevenuesByProfileIDInDB = async (profileID: string) => {
  try {
    await prismaClientDatabase.revenue.deleteMany({
      where: {
        profileId: profileID
      }
    })
    const result = await prismaClientDatabase.revenue.findMany({
      where: {
        profileId: profileID
      }
    })
    return result
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}
