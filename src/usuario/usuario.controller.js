import Usuario from './usuario.js'

const CAMPOS_PUBLICOS = 'nombreUsuario nivel puntos racha'

const datosPublicos = (usuario) => ({
    uid: usuario._id,
    nombreUsuario: usuario.nombreUsuario,
    nivel: usuario.nivel,
    puntos: usuario.puntos,
    racha: usuario.racha
})

export const agregarAmigo = async (req, res) => {
    try {
        const { nombreUsuario } = req.body ?? {}

        if (typeof nombreUsuario !== 'string' || !nombreUsuario.trim()) {
            return res.status(400).send({
                success: false,
                message: 'El nombre de usuario del amigo es requerido'
            })
        }

        const amigo = await Usuario.findOne({
            nombreUsuario: nombreUsuario.trim()
        })

        if (!amigo) {
            return res.status(404).send({
                success: false,
                message: 'Usuario no encontrado'
            })
        }

        if (amigo._id.equals(req.user.id)) {
            return res.status(400).send({
                success: false,
                message: 'No puedes agregarte a ti mismo como amigo'
            })
        }

        const usuario = await Usuario.findById(req.user.id).select('amigos')

        if (usuario.amigos.some(id => id.equals(amigo._id))) {
            return res.status(409).send({
                success: false,
                message: 'Ya son amigos'
            })
        }

        await Usuario.bulkWrite([
            {
                updateOne: {
                    filter: { _id: req.user.id },
                    update: { $addToSet: { amigos: amigo._id } }
                }
            },
            {
                updateOne: {
                    filter: { _id: amigo._id },
                    update: { $addToSet: { amigos: req.user.id } }
                }
            }
        ])

        return res.status(201).send({
            success: true,
            message: `${amigo.nombreUsuario} ahora es tu amigo`,
            amigo: datosPublicos(amigo)
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al agregar el amigo'
        })
    }
}

export const listarAmigos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id)
            .populate('amigos', CAMPOS_PUBLICOS)

        return res.send({
            success: true,
            message: 'Amigos obtenidos correctamente',
            amigos: usuario.amigos.map(datosPublicos)
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al obtener los amigos'
        })
    }
}
