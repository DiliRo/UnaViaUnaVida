import { Router } from 'express'
import {
    rankingGlobal,
    rankingAmigos
} from './ranking.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/', validateJwt, rankingGlobal)
api.get('/amigos', validateJwt, rankingAmigos)

export default api
