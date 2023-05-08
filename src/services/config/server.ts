import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import http from 'http'
import { Server } from 'socket.io'

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

//Created socket server
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

export { server, io }
