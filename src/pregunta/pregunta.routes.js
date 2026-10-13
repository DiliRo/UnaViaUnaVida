import { Router } from 'express'
import {
    crearPregunta,
    responderPregunta
} from './pregunta.controller.js'
import {
    validateJwt,
    isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/', [validateJwt, isAdmin], crearPregunta)
api.post('/:id/responder', validateJwt, responderPregunta)

export default api
