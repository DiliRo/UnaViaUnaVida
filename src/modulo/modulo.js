import mongoose from "mongoose";

const moduloSchema = new mongoose.Schema(
    {
         nombre:{
            type: String,
            required: [true, 'El nombre es requerido'],
            maxLength:[50, 'El nombre no puede sobrepasar de 50 caracteres']
        },
        decripcion:{
            type: String,
            required: [true, 'La descripción es requerido'],
            maxLength:[150, 'La descripción no puede sobrepasar de 150 caracteres']
        },
        lecciones:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Leccion"
            }
        ],
        puedeAcceder:{
            type: Boolean,
            default: false,
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

moduloSchema.methods.getDescripcion = function(){
    return this.decripcion;
}

moduloSchema.methods.setDescripcion = function(descripción){
    this.decripcion = descripción
}

moduloSchema.methods.getLecciones = function(){
    return this.lecciones;
}

moduloSchema.methods.setLeccion = function(idLeccion){
    this.lecciones.push(idLeccion);
}

moduloSchema.methods.getPuedeAcceder = function(){
    return this.puedeAcceder;
}

moduloSchema.methods.setPuedeAcceder = function(){
    !this.puedeAcceder;
}

const modulo = mongoose.model("Modulo", moduloSchema)

export default modulo;