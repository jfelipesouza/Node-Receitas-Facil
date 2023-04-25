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
    console.log(revenue)
    return { revenue }
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
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
      return {
        id: revenue.id,
        foodName: revenue.foodName,
        ingredients: revenue.ingredients,
        preparation: revenue.preparation,
        calories: revenue.calories,
        portions: revenue.portions,
        preparationTime: revenue.preparationTime,
        image: {
          id: revenue.image?.id,
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
  allInformation: boolean,
  skip: number = 0,
  take: number = 1
) => {
  try {
    const revenues = await prismaClientDatabase.revenue.findMany({
      select: {
        id: true,
        category: { select: { name: true } },
        foodDescription: true,
        foodName: true,
        image: allInformation && { select: { id: allInformation } }
      },
      skip,
      take
    })
    if (revenues) {
      console.log(revenues)
      return revenues
    }
    return null
  } catch (e) {
    console.log(e)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}
