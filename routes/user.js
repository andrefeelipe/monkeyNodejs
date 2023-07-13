import express from 'express'
import { UserController } from '../constrollers/user.js'
import { mdAuth } from '../middlewares/index.js'

const api = express.Router()

api.get('/user/me', UserController.getMe)

export const userRoutes = api