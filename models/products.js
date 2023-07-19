import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    category: String,
    price: Number,
    quantity: Number,
    image: String,
    createdAt: Date,
    updatedAt: Date,
})

export const Product = mongoose.model('Product', ProductSchema)