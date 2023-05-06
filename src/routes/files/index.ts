import { Request, Response, Router } from 'express'
import multer from 'multer'

import { uploadImage } from './image/uploadImage'
import { multerConfig } from '../../services/config/multer'
import { getImageById } from '../../services/database/ImageTableUtils'
import { uploadRestaurantImage } from './image/uploadRestaurantImage'

const filesRouters = Router()

filesRouters.post('/images', multer(multerConfig).single('file'), uploadImage)

filesRouters.post(
  '/restaurantImages',
  multer(multerConfig).single('file'),
  uploadRestaurantImage
)

filesRouters.get('/images', async (req: Request, res: Response) => {
  const { id } = req.query
  const image = await getImageById(String(id))
  return res.send({ image })
})

export { filesRouters }
