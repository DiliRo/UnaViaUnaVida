import Modulo from './modulo.js'

export const crearModulo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body

        const modulo = new Modulo({
            nombre,
            descripcion
        })

        await modulo.save()

        return res.status(201).send({
            success: true,
            message: 'Módulo creado correctamente',
            modulo
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al crear el módulo'
        })
    }
}

export const listarModulos = async (req, res) => {
    try {
        const modulos = await Modulo.find()

        return res.send({
            success: true,
            message: 'Módulos obtenidos correctamente',
            modulos
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al obtener los módulos'
        })
    }
}

export const obtenerModulo = async (req, res) => {
    try {
        const { id } = req.params

        const modulo = await Modulo.findById(id)

        if (!modulo) {
            return res.status(404).send({
                success: false,
                message: 'Módulo no encontrado'
            })
        }

        return res.send({
            success: true,
            message: 'Módulo obtenido correctamente',
            modulo
        })
    } catch (err) {
        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al obtener el módulo'
        })
    }
}