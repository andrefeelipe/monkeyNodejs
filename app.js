import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import { authRoutes, userRoutes } from './routes/index.js'

const app = express()

//Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//configuração da pasta statica
app.use(express.static('uploads'))

//Configuração do cors
app.use(cors())

//Configuração do morgan
app.use(morgan('dev'))

//Configuração de rotas
app.use('/api/v1', authRoutes)
app.use('/api/v1', userRoutes)

export { app }