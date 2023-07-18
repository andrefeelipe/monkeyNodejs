import express from 'express'
import { UserController } from '../constrollers/user.js'
import { mdAuth } from '../middlewares/index.js'

const api = express.Router()

api.get('/user/me', [mdAuth.asureAuth], UserController.getMe)
api.get('/user/getall', [mdAuth.asureAuth], UserController.getAllUsers)

export const userRoutes = api