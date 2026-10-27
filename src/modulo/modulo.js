import mongoose from "mongoose";

const moduloSchema = new mongoose.Schema(
    {
         nombre:{
            type: String,
            required: [true, 'El nombre es requerido'],
            maxLength:[50, 'El nombre no puede sobrepasar de 50 caracteres']
        },
        descripcion: {
            type: String,
            required: [true, 'La descripción es requerida'],
            maxLength: [150, 'La descripción no puede sobrepasar los 150 caracteres']
        },
        lecciones:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Leccion"
            }
        ],
        nivel:{
            type: Number,
            default: 0,
            required: [true, 'Este campo es requerida'],
        }
    }
)

moduloSchema.methods.getIdModulo = function(){
    return this._id;
}

moduloSchema.methods.getNombre = function(){
    return this.nombre;
}

moduloSchema.methods.setNombre = function(nombre){
    this.nombre = nombre;
}

moduloSchema.methods.getDescripcion = function () {
    return this.descripcion
}

moduloSchema.methods.setDescripcion = function (descripcion) {
    this.descripcion = descripcion
}

moduloSchema.methods.getLecciones = function(){
    return this.lecciones;
}

moduloSchema.methods.setLeccion = function(idLeccion){
    this.lecciones.push(idLeccion);
}

moduloSchema.methods.getNivel = function(){
    return this.nivel;
}

moduloSchema.methods.setNivel= function (nivel) {
    this.nivel = nivel
}

const modulo = mongoose.model("Modulo", moduloSchema)

export default modulo;