import { Router } from 'express'
import {
    agregarAmigo,
    listarAmigos
} from './usuario.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/amigos', validateJwt, agregarAmigo)
api.get('/amigos', validateJwt, listarAmigos)

export default api
