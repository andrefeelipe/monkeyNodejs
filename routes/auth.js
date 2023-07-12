import express from 'express'
import { AuthController } from '../constrollers/index.js'

const api = express.Router()

api.post('/auth/register', AuthController.register)

export const userRoutes = api