import { encrypt, checkPassword } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import Usuario from '../usuario/usuario.js'

export const register = async (req, res) => {
    try {
        const {
            nombre,
            nombreUsuario,
            email,
            contrasena
        } = req.body ?? {}

        if (
            typeof nombre !== 'string' || !nombre.trim() ||
            typeof nombreUsuario !== 'string' || !nombreUsuario.trim() ||
            typeof email !== 'string' || !email.trim() ||
            typeof contrasena !== 'string'
        ) {
            return res.status(400).send({
                success: false,
                message: 'Nombre, usuario, correo y contraseña son requeridos'
            })
        }

        if (contrasena.length < 8 || contrasena.length > 100) {
            return res.status(400).send({
                success: false,
                message: 'La contraseña debe tener entre 8 y 100 caracteres'
            })
        }

        const correo = email.trim().toLowerCase()

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            return res.status(400).send({
                success: false,
                message: 'El correo no es válido'
            })
        }

        const existingUser = await Usuario.findOne({
            $or: [
                { nombreUsuario: nombreUsuario.trim() },
                { email: correo }
            ]
        })

        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'El usuario o correo ya está registrado'
            })
        }

        const nuevoUsuario = new Usuario({
            nombre: nombre.trim(),
            nombreUsuario: nombreUsuario.trim(),
            email: correo,
            contrasena: await encrypt(contrasena),
            rol: 'USER'
        })

        await nuevoUsuario.save()

        return res.status(201).send({
            success: true,
            message: 'Usuario creado'
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send({
                success: false,
                message: 'El usuario o correo ya está registrado'
            })
        }

        if (err.name === 'ValidationError') {
            return res.status(400).send({
                success: false,
                message: 'Datos de registro inválidos',
                errors: Object.values(err.errors).map(error => error.message)
            })
        }

        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al registrar el usuario'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { nombreUsuario, contrasena } = req.body ?? {}

        if (
            typeof nombreUsuario !== 'string' || !nombreUsuario.trim() ||
            typeof contrasena !== 'string' || !contrasena
        ) {
            return res.status(400).send({
                success: false,
                message: 'Usuario y contraseña son requeridos'
            })
        }

        const usuario = await Usuario.findOne({
            nombreUsuario: nombreUsuario.trim()
        })

        if (!usuario) {
            return res.status(401).send({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            })
        }

        const passwordValida = await checkPassword(
            usuario.contrasena,
            contrasena
        )

        if (!passwordValida) {
            return res.status(401).send({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            })
        }

        const payload = {
            uid: usuario._id,
            nombre: usuario.nombre,
            nombreUsuario: usuario.nombreUsuario,
            nivel: usuario.nivel
        }

        const token = await generateJwt(payload)

        return res.send({
            success: true,
            message: `Bienvenido ${usuario.nombreUsuario}`,
            token
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al iniciar sesión'
        })
    }
}