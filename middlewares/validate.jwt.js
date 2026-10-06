import jwt from 'jsonwebtoken'
import { findUser } from '../helpers/db.validators.js'

export const validateJwt = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).send({
                success: false,
                message: 'Token requerido'
            })
        }

        const token = authorization.replace(/^Bearer\s+/i, '').trim()

        const payload = jwt.verify(
            token,
            process.env.SECRET_KEY,
            { algorithms: ['HS256'] }
        )

        const usuario = await findUser(payload.uid)

        if (!usuario) {
            return res.status(401).send({
                success: false,
                message: 'Usuario no autorizado'
            })
        }

        req.user = {
            id: usuario._id,
            email: usuario.email,
            rol: usuario.rol
        }

        return next()
    } catch (err) {
        return res.status(401).send({
            success: false,
            message: 'Token inválido o expirado'
        })
    }
}

export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({
            success: false,
            message: 'Debes iniciar sesión'
        })
    }

    if (req.user.rol !== 'ADMIN') {
        return res.status(403).send({
            success: false,
            message: 'Se requiere el rol de administrador'
        })
    }

    return next()
}