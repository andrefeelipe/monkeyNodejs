import { Product } from '../models/products.js'
import { getFilePath } from '../utils/index.js'

function createProduct(req, res) {
    const { name, description, category, price, quantity } = req.body

    const product = new Product({
        name,
        description,
        category,
        price,
        quantity,
    })

    product.save()
    .then((productStored) => {
        return res.status(201).send(productStored)
    })
    .catch((error) => {
        return res.status(500).send({ mgs: "Erro de servidor!"})
    })
    
}

async function getAllProducts(req, res) {
    try {
        const { _id } = req.body
        const products = await Product.find({ _id: { $ne: _id } }).select(["-__v"])

        if (!products) {
            return res.status(400).send({ msg: 'Nenhum produto encontrado!'})
        } else {
            return res.status(200).send(products)
        }
    } catch (error) {
        return res.status(500).send({ msg: 'Erro de servidor!'})
    }
}

async function getProductById(req, res) {
    const { id } = req.params

    try {
        const response = await Product.findById(id).select(["-__v"])

        if (!response) {
            return res.status(400).send({ msg: 'Nenhum produto encontrado!'})
        } else {
            return res.status(200).send(response)
        }
    } catch (error) {
        return res.status(500).send({ msg: 'Erro de servidor!'})
    }
}

async function updateProduct(req, res) {
    const { id } = req.params
    const { name, description, category, price, quantity } = req.body

    const product = await Product.findById(id)
    
    if (name) {
        product.name = name
    }
    if (description) {
        product.description = description
    }
    if (category) {
        product.category = category
    }
    if (price) {
        product.price = price
    }
    if (quantity) {
        product.quantity = quantity
    }

    if (req.files.image) {
        const imagePath = getFilePath(req.files.image)
        product.image = imagePath
    }

    Product.findByIdAndUpdate(id, product)
    .then((userUpdated) => {
        if (!userUpdated) {
            return res.status(400).send({ msg: 'Erro ao atualizar o usuário!'})
        } else {
            return res.status(200).send({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                quantity: product.quantity,
                image: product.image,
            })
        }
    }).catch((error) => {
        res.status(500).send({ msg: 'Erro de servidor!'})
    })
}

export const ProductsController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
}