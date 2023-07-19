import express from 'express'
import { ProductsController } from '../constrollers/product.js'
import multiparty from 'connect-multiparty'
import { mdAuth } from '../middlewares/index.js'

const mdUpload = multiparty({ uploadDir: "./uploads/images"})
const api = express.Router()

api.post('/product', [mdAuth.asureAuth], ProductsController.createProduct)
api.patch('/product/update/:id', [mdAuth.asureAuth, mdUpload], ProductsController.updateProduct)
api.get('/products', [mdAuth.asureAuth], ProductsController.getAllProducts)
api.get('/product/:id', [mdAuth.asureAuth], ProductsController.getProductById)

export const productRoutes = api