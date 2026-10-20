import Usuario from '../usuario/usuario.js'

const CAMPOS_PUBLICOS = 'nombreUsuario nivel puntos racha'

const ORDEN_RANKING = { puntos: -1, nivel: -1, nombreUsuario: 1 }

const armarRanking = (usuarios, idActual) =>
    usuarios.map((usuario, index) => ({
        posicion: index + 1,
        uid: usuario._id,
        nombreUsuario: usuario.nombreUsuario,
        nivel: usuario.nivel,
        puntos: usuario.puntos,
        racha: usuario.racha,
        esYo: usuario._id.equals(idActual)
    }))

export const rankingGlobal = async (req, res) => {
    try {
        const limite = Math.min(
            Math.max(parseInt(req.query.limite, 10) || 10, 1),
            100
        )

        const usuarios = await Usuario.find()
            .sort(ORDEN_RANKING)
            .limit(limite)
            .select(CAMPOS_PUBLICOS)

        return res.send({
            success: true,
            message: 'Ranking global obtenido correctamente',
            ranking: armarRanking(usuarios, req.user.id)
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al obtener el ranking global'
        })
    }
}

export const rankingAmigos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id).select('amigos')

        const usuarios = await Usuario.find({
            _id: { $in: [...usuario.amigos, usuario._id] }
        })
            .sort(ORDEN_RANKING)
            .select(CAMPOS_PUBLICOS)

        return res.send({
            success: true,
            message: 'Ranking de amigos obtenido correctamente',
            ranking: armarRanking(usuarios, req.user.id)
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al obtener el ranking de amigos'
        })
    }
}
