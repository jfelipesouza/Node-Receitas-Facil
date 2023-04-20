import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './cors'
import { router } from '../../routes'

// Created server
const app = express()

// Set Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsConfig))
app.use(morgan('dev'))
app.use('/', router)

export { app }
