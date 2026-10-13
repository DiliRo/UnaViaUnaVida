import Pregunta from './pregunta.js'
import Leccion from '../leccion/leccion.js'

export const crearPregunta = async (req, res) => {
    try {
        const {
            idLeccion,
            enunciado,
            opciones,
            retroalimentacion
        } = req.body ?? {}

        if (!Array.isArray(opciones) || opciones.length < 2) {
            return res.status(400).send({
                success: false,
                message: 'La pregunta debe tener al menos 2 opciones'
            })
        }

        const opcionesLimpias = opciones.map(opcion => ({
            texto: opcion?.texto,
            esCorrecta: opcion?.esCorrecta
        }))

        const correctas = opcionesLimpias.filter(
            opcion => opcion.esCorrecta === true
        )

        if (correctas.length !== 1) {
            return res.status(400).send({
                success: false,
                message: 'La pregunta debe tener exactamente una opción correcta'
            })
        }

        const leccion = await Leccion.findById(idLeccion)

        if (!leccion) {
            return res.status(404).send({
                success: false,
                message: 'Lección no encontrada'
            })
        }

        const pregunta = new Pregunta({
            enunciado,
            opciones: opcionesLimpias,
            retroalimentacion
        })

        await pregunta.save()

        leccion.setPregunta(pregunta._id)
        leccion.setPuntosMaximos(leccion.calcularPosiblesPuntosMaximos())
        await leccion.save()

        return res.status(201).send({
            success: true,
            message: 'Pregunta creada y agregada a la lección',
            pregunta
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send({
                success: false,
                message: 'Datos de la pregunta inválidos',
                errors: Object.values(err.errors).map(error => error.message)
            })
        }

        if (err.name === 'CastError') {
            return res.status(400).send({
                success: false,
                message: 'ID inválido'
            })
        }

        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al crear la pregunta'
        })
    }
}

export const responderPregunta = async (req, res) => {
    try {
        const { id } = req.params
        const { idOpcion } = req.body ?? {}

        if (!idOpcion) {
            return res.status(400).send({
                success: false,
                message: 'La opción seleccionada es requerida'
            })
        }

        const pregunta = await Pregunta.findById(id)

        if (!pregunta) {
            return res.status(404).send({
                success: false,
                message: 'Pregunta no encontrada'
            })
        }

        let correcta

        try {
            correcta = pregunta.VerificarRespuesta(idOpcion)
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: error.message
            })
        }

        return res.send({
            success: true,
            message: correcta ? 'Respuesta correcta' : 'Respuesta incorrecta',
            correcta,
            retroalimentacion: pregunta.getRetroalimentacion()
        })
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).send({
                success: false,
                message: 'ID inválido'
            })
        }

        console.error(err)

        return res.status(500).send({
            success: false,
            message: 'Error al responder la pregunta'
        })
    }
}