import Leccion from './leccion.js'
import Modulo from '../modulo/modulo.js'

export const crearLeccion = async (req, res) => {
    try {
        const {
            idModulo,
            titulo,
            descripcion,
            intentosMaximos
        } = req.body

        const modulo = await Modulo.findById(idModulo)

        if (!modulo) {
            return res.status(404).send({
                success: false,
                message: 'Módulo no encontrado'
            })
        }

        const leccion = new Leccion({
            titulo,
            descripcion,
            intentosMaximos
        })

        await leccion.save()

        modulo.setLeccion(leccion._id)
        await modulo.save()

        return res.status(201).send({
            success: true,
            message: 'Lección creada y agregada al módulo',
            leccion
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al crear la lección'
        })
    }
}

export const listarLecciones = async (req, res) => {
    try {
        const lecciones = await Leccion.find()

        return res.send({
            success: true,
            message: 'Lecciones obtenidas correctamente',
            lecciones
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al obtener las lecciones'
        })
    }
}

export const obtenerLeccion = async (req, res) => {
    try {
        const { id } = req.params

        const leccion = await Leccion.findById(id)

        if (!leccion) {
            return res.status(404).send({
                success: false,
                message: 'Lección no encontrada'
            })
        }

        return res.send({
            success: true,
            message: 'Lección obtenida correctamente',
            leccion
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al obtener la lección'
        })
    }
}

export const actualizarLeccion = async (req, res) => {
    try {
        const { id } = req.params
        const {
            titulo,
            descripcion,
            intentosMaximos
        } = req.body

        const leccion = await Leccion.findById(id)

        if (!leccion) {
            return res.status(404).send({
                success: false,
                message: 'Lección no encontrada'
            })
        }

        if (titulo !== undefined) {
            leccion.setTitulo(titulo)
        }

        if (descripcion !== undefined) {
            leccion.setDescripcion(descripcion)
        }

        if (intentosMaximos !== undefined) {
            leccion.intentosMaximos = intentosMaximos
        }

        await leccion.save()

        return res.send({
            success: true,
            message: 'Lección actualizada correctamente',
            leccion
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al actualizar la lección'
        })
    }
}

export const eliminarLeccion = async (req, res) => {
    try {
        const { id } = req.params

        const leccion = await Leccion.findById(id)

        if (!leccion) {
            return res.status(404).send({
                success: false,
                message: 'Lección no encontrada'
            })
        }

        await Modulo.updateMany(
            { lecciones: leccion._id },
            { $pull: { lecciones: leccion._id } }
        )

        await leccion.deleteOne()

        return res.send({
            success: true,
            message: 'Lección eliminada correctamente'
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al eliminar la lección'
        })
    }
}