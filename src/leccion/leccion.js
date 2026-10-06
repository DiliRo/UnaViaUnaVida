import mongoose from "mongoose";

const leccionSchema = new mongoose.Schema(
    {
        titulo:{
            type: String,
            required: [true, 'El titulo es requerido'],
            maxLength:[50, 'El titulo no puede sobrepasar de 50 caracteres']
        },
        descripcion: {
            type: String,
            required: [true, 'La descripción es requerida'],
            maxLength: [150, 'La descripción no puede sobrepasar los 150 caracteres']
        },
        preguntas:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pregunta",
            }
        ],
        puntosMaximos:{
            type: Number,
            default: 0,
            required: [true, 'Los puntos maximos de lección son necesario'],
        },
        intentosMaximos: {
            type: Number,
            default: 5,
            min: [1, 'Debe permitirse al menos un intento'],
            validate: {
                validator: Number.isInteger,
                message: 'Los intentos máximos deben ser un número entero'
            }
        }       
    }
)

leccionSchema.methods.getId = function(){
    return this._id;
}

leccionSchema.methods.getTitulo = function(){
    return this.titulo;
}

leccionSchema.methods.setTitulo = function(titulo){
    this.titulo = titulo;
}

leccionSchema.methods.getDescripcion = function () {
    return this.descripcion
}

leccionSchema.methods.setDescripcion = function (descripcion) {
    this.descripcion = descripcion
}

leccionSchema.methods.getPreguntas = function(){
    return this.preguntas;
}

leccionSchema.methods.setPregunta = function(idPregunta){
    this.preguntas.push(idPregunta)
}

leccionSchema.methods.getPuntosMaximos = function(){
    return this.puntosMaximos;
}

leccionSchema.methods.setPuntosMaximos = function(puntos){
    this.puntosMaximos = puntos;
}

leccionSchema.methods.calcularPosiblesPuntosMaximos = function () {
    return this.preguntas.length
}

leccionSchema.methods.getIntentosMaximos = function () {
    return this.intentosMaximos
}

const leccion = mongoose.model('Leccion', leccionSchema)

export default leccion