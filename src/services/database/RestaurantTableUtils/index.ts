import { prismaClientDatabase } from '../prisma'

type Restaurant = {
  address: string
  image: string
  name: string
  numberOfStar: number
}

export const createRestaurantInDb = async ({
  address,
  image,
  name,
  numberOfStar
}: Restaurant) => {
  try {
    const restaurant = await prismaClientDatabase.restaurant.create({
      data: { address, name, numberOfStar, image: { connect: { id: image } } }
    })

    return restaurant
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

export const getAllRestaurantInDB = async () => {
  try {
    const restaurants = await prismaClientDatabase.restaurant.findMany({
      include: { image: { select: { mimeType: true, file: true } } }
    })

    return restaurants
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}
