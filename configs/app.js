'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors'

import authRoutes from '../src/auth/auth.routes.js'
import moduloRoutes from '../src/modulo/modulo.routes.js'
import leccionRoutes from '../src/leccion/leccion.routes.js'
import preguntaRoutes from '../src/pregunta/pregunta.routes.js'
import usuarioRoutes from '../src/usuario/usuario.routes.js'
import rankingRoutes from '../src/ranking/ranking.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    
}

const routes = (app)=>{
    app.use('/v1/auth', authRoutes)
    app.use('/v1/modulos', moduloRoutes)
    app.use('/v1/lecciones', leccionRoutes)
    app.use('/v1/preguntas', preguntaRoutes)
    app.use('/v1/usuarios', usuarioRoutes)
    app.use('/v1/ranking', rankingRoutes)
}

export const initServer = () => {
    const app = express()
    configs(app)
    routes(app)

    const port = process.env.PORT

    app.listen(port, () => {
        console.log(`Servidor ejecutándose en el puerto ${port}`)
    })
}