import { Router } from 'express'
import {
    crearModulo,
    listarModulo,
    listarModulos,
    obtenerModulo
} from './modulo.controller.js'
import {
    validateJwt,
    isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/', [validateJwt, isAdmin], crearModulo)
api.get('/', validateJwt, listarModulos)
api.get('/:id', validateJwt, obtenerModulo)
api.get('/nivel/:nivel', validateJwt, listarModulo)

export default api