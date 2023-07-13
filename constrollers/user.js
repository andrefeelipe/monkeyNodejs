import { User } from '../models/index.js'

async function getMe(req, res) {
    res.status(200).json({ msg: "Minhas informações!"})
}

export const UserController = {
    getMe,
}