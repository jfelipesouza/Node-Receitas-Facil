import { prismaClientDatabase } from '../prisma'

type ImageDto = {
  file: string
  mimeType: string
  originalName: string
}

const getImageById = async (id: string) => {
  try {
    const image = await prismaClientDatabase.image.findFirst({
      where: { id },
      select: { file: true, mimeType: true }
    })
    return image
  } catch (e) {
    console.log(e)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

const uploadImageDB = async ({ mimeType, originalName, file }: ImageDto) => {
  try {
    const image = await prismaClientDatabase.image.create({
      data: { file, originalName, mimeType }
    })
    return { image }
  } catch (e) {
    console.log(e)
  } finally {
    await prismaClientDatabase.$disconnect()
  }
}

export { uploadImageDB, getImageById }
