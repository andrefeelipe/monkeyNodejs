import bcrypt from 'bcryptjs'
import { jwt } from '../utils/index.js'
import { User } from '../models/index.js'

function register(req, res) {
    const { email, password } = req.body

    const salt = bcrypt.genSaltSync(12)
    const hashPassword = bcrypt.hashSync(password, salt)

    const user = new User({ 
        email: email.toLowerCase(), 
        password: hashPassword
    })

    user.save()
    .then((userStorage) => {
        res.status(201).send(userStorage)
    })
    .catch((error) => {
        res.status(400).send({ mgs: "Erro ao cadastrar usuário"})
        console.log(error)
    })
}

function login(req, res) {
    const { email, password } = req.body

    const emailLowerCase = email.toLowerCase()

    User.findOne({email: emailLowerCase})
    .then((userStorage) => {
        bcrypt.compare(password, userStorage.password, (bcryptError, check) => {
            if (bcryptError) {
                res.status(500).send({ msg: "Erro de servidor!"})
            } else if (!check) {
                res.status(400).send({ msg: "Usuário e senha inválidos!"})
            } else {
                res.status(200).send({ 
                    accessToken: jwt.createAccessToken(userStorage),
                    refreshToken: jwt.createRefreshToken(userStorage)
                })
            }
        })
    })
    .catch((error) => {
        res.status(500).send({ msg: "Erro de servidor!"})
    })
}

function refreshAccessToken(req, res) {
    const { refreshToken } = req.body

    if (!refreshToken) {
        res.status(400).send({ msg: "Token requerido!" })
    }

    const hasExpired = jwt.hasExpiredToken(refreshToken)
    if (hasExpired) {
        res.status(400).send({ msg: "Token expirado!" })
    }

    const { user_id } = jwt.decoded(refreshToken)
    User.findById(user_id)
    .then((userStorage) => {
        res.status(200).send({
            accessToken: jwt.createAccessToken(userStorage),    
        })
    })
    .catch((error) => {
        res.status(500).send({ msg: "Erro de servidor!" })
    })
}

export const AuthController = {
    register,
    login,
    refreshAccessToken,
}