import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: [true, 'El nombre es requerido'],
            maxLength:[25, 'El nombre no puede sobrepasar de 25 caracteres']
        },
        nombreUsuario:{
            type: String,
            required: [true, 'Nombre de usuario es requerido'],
            maxLength:[25, 'El nombre de usuario no puede sobrepasar de 25 caracteres']
        },
        contrasena:{
            type: String,
            required: [true, 'Contraseña es requerida'],
            maxLength: [100, 'Los contraseña no puede sobrepasar de 100 caracteres'],
            minLength: [8, 'Los contraseña no puede ser menor de 8 caracteres']
        },
        nivel:{
            type: Number,
            default: 1
        },
        racha:{
            type: Number,
            defaul: 0
        },
        puntos:{
            type: Number,
            defaul: 0
        },
        amigos:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Usuario",
            }
        ]    
    }
)

usuarioSchema.methods.getIdUsuario =function(){
    return this._id.toString();
}

usuarioSchema.methods.getNombre = function() {
    return this.nombre;
}

usuarioSchema.methods.setNombre = function(nombre){
    this.nombre = nombre;
}

usuarioSchema.methods.getNombreUsuario = function() {
    return this.nombreUsuario;
};

usuarioSchema.methods.setNombreUsuario = function(nombreUsuario) {
    this.nombreUsuario = nombreUsuario;
};

usuarioSchema.methods.getNivel = function() {
    return this.nivel;
};

usuarioSchema.methods.setNivel = function(nivel) {
    this.nivel = nivel;
};

usuarioSchema.methods.getRacha = function() {
    return this.racha;
};

usuarioSchema.methods.setRacha = function(racha) {
    this.racha = racha;
};

usuarioSchema.methods.getPuntos = function() {
    return this.puntos;
};

usuarioSchema.methods.setPuntos = function(puntos) {
    this.puntos = puntos;
};

usuarioSchema.methods.agregarPuntos = function(cantidad){
    this.puntos += cantidad
}

usuarioSchema.methods.agregarAmigo = function(idAmigo) {
    this.amigos.push(idAmigo);
};

usuarioSchema.methods.getAmigos = function() {
    return this.amigos;
};

const usuario = mongoose.model("Usuario", usuarioSchema)

export default usuario;