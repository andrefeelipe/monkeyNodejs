import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRETY_KEY } from '../constants.js'

function createAccessToken(user) {
    const expToken = new Date()
    expToken.setHours(expToken.getHours() + 24)

    const payload = {
        token_type: 'accessToken',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }

    return jsonwebtoken.sign(payload, JWT_SECRETY_KEY)
}

function createRefreshToken(user) {
    const expToken = new Date()
    expToken.setMonth(expToken.getMonth() + 1)

    const payload = {
        token_type: 'accessRefresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }

    return jsonwebtoken.sign(payload, JWT_SECRETY_KEY)
}

function decoded(token) {
    return jsonwebtoken.decode(token, JWT_SECRETY_KEY, true)
}

function hasExpiredToken(token) {
    const { exp } = decoded(token)
    const currentDate = new Date().getTime()

    if (exp <= currentDate ) {
        return true
    }

    return false
}

export const jwt = {
    decoded,
    hasExpiredToken,
    createAccessToken,
    createRefreshToken,
}