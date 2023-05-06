import { Request, Response } from 'express'
import { uploadRestaurantImageInDB } from '../../../../services/database/RestaurantImageTable'

const uploadRestaurantImage = async (req: Request, res: Response) => {
  const file = req.file

  if (!file) {
    return res.status(400).send({ message: 'Tipo de arquivo incorreto' })
  }

  const fileBase64 = Buffer.from(file.buffer).toString('base64')

  const mimeType = file.mimetype

  const imageUpload = await uploadRestaurantImageInDB({
    file: fileBase64,
    mimeType
  })

  console.log({ imageUpload })

  if (imageUpload) {
    return res.status(200).send({ image: imageUpload })
  }
  return res.status(500).send({ message: 'error' })
}

export { uploadRestaurantImage }
