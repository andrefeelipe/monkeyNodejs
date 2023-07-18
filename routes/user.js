import express from 'express'
import { UserController } from '../constrollers/user.js'
import multiparty from 'connect-multiparty'
import { mdAuth } from '../middlewares/index.js'

const mdUpload = multiparty({ uploadDir: "./uploads/avatar"})
const api = express.Router()

api.get('/user/me', [mdAuth.asureAuth], UserController.getMe)
api.patch('/user/me', [mdAuth.asureAuth, mdUpload], UserController.updateUser)

api.get('/user/getall', [mdAuth.asureAuth], UserController.getAllUsers)
api.get('/user/getbyid/:id', [mdAuth.asureAuth], UserController.getUserById)

export const userRoutes = api