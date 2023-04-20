import { Router } from 'express'
import multer from 'multer'

import { uploadImage } from './image/uploadImage'
import { multerConfig } from '../../services/config/multer'

const uploadRouters = Router()

uploadRouters.post('/images', multer(multerConfig).single('file'), uploadImage)

export { uploadRouters }
