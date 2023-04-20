import { diskStorage, Options, memoryStorage } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

const uploadDir = resolve(__dirname, '..', '..', 'uploads')

const storage = {
  disk: diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir)
    },
    filename: (req, file: Express.Multer.File & { key: string }, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err, err.message)
        file.key = `${hash.toString('hex')}-${file.originalname}`
        cb(null, file.key)
      })
    }
  }),
  memory: memoryStorage()
}

const multerConfig: Options = {
  dest: uploadDir,
  storage: storage.memory,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2mb
  },
  fileFilter: (req, file, cb) => {
    const allowFormat = [
      'image/pjpeg',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/svg',
      'image/webp'
    ]
    if (allowFormat.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid type'))
    }
  }
}

export { multerConfig }
