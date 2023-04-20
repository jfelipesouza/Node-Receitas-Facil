import { Request, Response } from 'express'
import { uploadImageDB } from '../../../../services/database/ImageTableUtils'

const uploadImage = async (req: Request, res: Response) => {
  const file = req.file

  if (!file) {
    return res.status(400).send({ message: 'Tipo de arquivo incorreto' })
  } else {
    const fileBase64 = Buffer.from(file.buffer).toString('base64')

    const originalName = file.originalname
    const mimeType = file.mimetype

    const imageUpload = await uploadImageDB({
      file: fileBase64,
      mimeType,
      originalName
    })

    if (imageUpload) {
      return res.status(200).send({ image: imageUpload.image })
    }
    return res.status(500).send({ message: 'error' })
  }
}

export { uploadImage }
