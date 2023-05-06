import { prismaClientDatabase } from '../prisma'

type ImageDto = {
  file: string
  mimeType: string
}

export const uploadRestaurantImageInDB = async ({
  file,
  mimeType
}: ImageDto) => {
  try {
    const image = await prismaClientDatabase.restaurantImage.create({
      data: { file, mimeType }
    })
    console.log({ image })
    return image
  } catch (error) {
    console.log(error)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}
