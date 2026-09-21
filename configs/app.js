'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors'

import authRoutes from '../src/auth/auth.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/auth', authRoutes)
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