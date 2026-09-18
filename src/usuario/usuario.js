import mongoose from "mongoose";

import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es requerido'],
            maxLength: [
                25,
                'El nombre no puede sobrepasar los 25 caracteres'
            ],
            trim: true
        },

        nombreUsuario: {
            type: String,
            required: [true, 'El nombre de usuario es requerido'],
            maxLength: [
                25,
                'El nombre de usuario no puede sobrepasar los 25 caracteres'
            ],
            unique: true,
            trim: true
        },

        contrasena: {
            type: String,
            required: [true, 'La contraseña es requerida'],
            maxLength: [
                100,
                'La contraseña no puede sobrepasar los 100 caracteres'
            ],
            minLength: [
                8,
                'La contraseña no puede tener menos de 8 caracteres'
            ]
        },

        rol: {
            type: String,
            enum: {
                values: ['ADMIN', 'USER'],
                message: 'El rol debe ser ADMIN o USER'
            },
            uppercase: true,
            default: 'USER'
        },

        nivel: {
            type: Number,
            default: 1,
            min: [1, 'El nivel no puede ser menor que 1']
        },

        racha: {
            type: Number,
            default: 0,
            min: [0, 'La racha no puede ser negativa']
        },

        puntos: {
            type: Number,
            default: 0,
            min: [0, 'Los puntos no pueden ser negativos']
        },

        amigos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario'
            }
        ]
    }
)

usuarioSchema.methods.getIdUsuario = function () {
    return this._id
}

usuarioSchema.methods.getNombre = function () {
    return this.nombre
}

usuarioSchema.methods.setNombre = function (nombre) {
    this.nombre = nombre
}

usuarioSchema.methods.getNombreUsuario = function () {
    return this.nombreUsuario
}

usuarioSchema.methods.setNombreUsuario = function (nombreUsuario) {
    this.nombreUsuario = nombreUsuario
}

usuarioSchema.methods.getRol = function () {
    return this.rol
}

usuarioSchema.methods.setRol = function (rol) {
    this.rol = rol
}

usuarioSchema.methods.getNivel = function () {
    return this.nivel
}

usuarioSchema.methods.setNivel = function (nivel) {
    this.nivel = nivel
}

usuarioSchema.methods.getRacha = function () {
    return this.racha
}

usuarioSchema.methods.setRacha = function (racha) {
    this.racha = racha
}

usuarioSchema.methods.getPuntos = function () {
    return this.puntos
}

usuarioSchema.methods.setPuntos = function (puntos) {
    this.puntos = puntos
}

usuarioSchema.methods.agregarPuntos = function (cantidad) {
    this.puntos += cantidad
}

usuarioSchema.methods.agregarAmigo = function (idAmigo) {
    this.amigos.push(idAmigo)
}

usuarioSchema.methods.getAmigos = function () {
    return this.amigos
}

usuarioSchema.methods.toJSON = function () {
    const {__v, contrasena, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default mongoose.model('Usuario', usuarioSchema)


