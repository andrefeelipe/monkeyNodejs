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

export const UserController = {
    getMe,
}