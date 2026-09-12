'use strict'

import express from 'express'

export const initServer = () => {
    const app = express()

    const port = process.env.PORT

    app.listen(port, () => {
        console.log(`Servidor ejecutándose en el puerto ${port}`)
    })
}