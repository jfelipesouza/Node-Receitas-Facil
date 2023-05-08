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
        profile: { connect: { id: profile.id } },
        categories: {
          connect: category.map(e => {
            return { name: e }
          })
        }
      }
    })

    return revenue
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
      include: {
        image: { select: { mimeType: true, file: true } },
        categories: { select: { name: true } }
      }
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
        image: revenue.image,
        categories: revenue.categories
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
  skip: number = 0,
  take: number = 10,
  filter?: string
) => {
  try {
    if (filter) {
      const revenues = await prismaClientDatabase.revenue.findMany({
        where: {
          foodName: { contains: filter }
        },
        select: {
          id: true,
          foodName: true,
          image: { select: { mimeType: true, file: true } },
          categories: { select: { name: true } }
        },
        skip,
        take
      })
      if (revenues) {
        return revenues
      }
    }
    const revenues = await prismaClientDatabase.revenue.findMany({
      select: {
        id: true,
        foodName: true,
        image: { select: { mimeType: true, file: true } },
        categories: { select: { name: true } }
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

export const getRandomRevenuesInDB = async () => {
  try {
    const numberOfRevenuesInDB = await prismaClientDatabase.revenue.count()

    const findRandomRevenue = await prismaClientDatabase.revenue.findMany({
      skip: Math.floor(Math.random() * numberOfRevenuesInDB),
      take: 1,

      select: {
        id: true,
        foodName: true,
        image: { select: { mimeType: true, file: true } }
      }
    })
    return findRandomRevenue[0]
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
