import { Request, Response, Router } from 'express'
import multer from 'multer'

import { uploadImage } from './image/uploadImage'
import { multerConfig } from '../../services/config/multer'
import { getImageById } from '../../services/database/ImageTableUtils'

const uploadRouters = Router()

uploadRouters.post('/images', multer(multerConfig).single('file'), uploadImage)
uploadRouters.get('/images', async (req: Request, res: Response) => {
  const { id } = await req.body
  const image = await getImageById(id)
  return res.send({ image })
})

export { uploadRouters }
