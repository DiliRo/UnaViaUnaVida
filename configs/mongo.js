'use strict'

import mongoose from 'mongoose'

export const connect = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGO, {
            maxPoolSize: 50,
            serverSelectionTimeoutMS: 5000
        })

        console.log('Conexión con MongoDB establecida correctamente')
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message)
        throw error
    }
}