import { jwt } from '../utils/index.js'

function asureAuth(req, res, next) {
    if (!res.headers.authorization) {
        return res.status(403).send({ message: "Vocês não tem autorização para acessar a aplicação!"})
    }

    const token = req.headers.authorization.replace("Barer ", "")

    try {
        const hasExpired = jwt.hasExpiredToken(token)
        
        if (hasExpired) {
            return res.status(400).send({ message: "Token expirado!"})
        }

        const payload = jwt.decoded(token)
        req.user = payload

        next()
    } catch (error) {
        console.log(error)
    }
}

export const mdAuth = {
    asureAuth
}