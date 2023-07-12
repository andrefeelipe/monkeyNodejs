import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'

function register(req, res) {
    const { email, password } = req.body

    const salt = bcrypt.genSaltSync(12)
    const hashPassword = bcrypt.hashSync(password, salt)

    const user = new User({ 
        email: email.toLowerCase(), 
        password: hashPassword
    })

    user.save((error, userStorage) => {})
    .then(() => {
        res.status(201).send(userStorage)
    })
    .catch((error) => {
        res.status(400).send({ msg: "Erro ao cadastrar o usuário."})
        console.log(error)
    })

    function login(req, res) {
        console.log
    }
}

export const AuthController = {
    register,
}