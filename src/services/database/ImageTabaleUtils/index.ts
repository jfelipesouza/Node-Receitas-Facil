import { prismaClientDatabase } from '../prisma'

type ImageDto = {
  file: string
  mimeType: string
  originalName: string
}
const uploadImageDB = async ({ mimeType, originalName, file }: ImageDto) => {
  try {
    const image = await prismaClientDatabase.image.create({
      data: { file, originalName, mimeType }
    })
    console.log(image)
    return { image }
  } catch (e) {
    console.log(e)
  }
}

export { uploadImageDB }
