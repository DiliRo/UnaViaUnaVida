import { Router } from 'express'
import {
    crearLeccion,
    listarLecciones,
    obtenerLeccion,
    actualizarLeccion,
    eliminarLeccion
} from './leccion.controller.js'
import {
    validateJwt,
    isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/', [validateJwt, isAdmin], crearLeccion)

api.get('/', validateJwt, listarLecciones)
api.get('/:id', validateJwt, obtenerLeccion)

api.patch('/:id', [validateJwt, isAdmin], actualizarLeccion)
api.delete('/:id', [validateJwt, isAdmin], eliminarLeccion)

export default api