import { User } from '../models/index.js'

async function getMe(req, res) {
    const { user_id } = req.user

    try {
        const response = await User.findById(user_id).select(["-password", "-__v"])
        
        if (!response) {
            return res.status(400).send({ msg: "Usuário não encontrado!"})
        } else {
            return res.status(200).send(response)
        }
    } catch (error) {
        return res.status(500).send({ msg: "Erro de servidor!"})
    }
}

async function getAllUsers(req, res) {
    try {
        const { user_id } = req.user
        const response = await User.find({ _id: { $ne: user_id } }).select(["-password", "-__v"])

        if (!response) {
            return res.status(400).send({ msg: 'Nenhum usuário encontrado!'})
        } else {
            return res.status(200).send(response)
        }
    } catch (error) {
        return res.status(500).send({ msg: 'Erro de servidor!'})
    }
}

async function getUserById(req, res) {
    const { id } = req.params

    try {
        const response = await User.findById(id).select(["-password", "-__v"])

        if (!response) {
            return res.status(400).send({ msg: 'Nenhum usuário encontrado!'})
        } else {
            return res.status(200).send(response)
        }
    } catch (error) {
        return res.status(500).send({ msg: 'Erro de servidor!'})
    }
}

export const UserController = {
    getMe,
    getAllUsers,
    getUserById,
}