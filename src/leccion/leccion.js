import mongoose from "mongoose";

const leccionSchema = new mongoose.Schema(
    {
        titulo:{
            type: String,
            required: [true, 'El titulo es requerido'],
            maxLength:[50, 'El titulo no puede sobrepasar de 50 caracteres']
        },
        decripcion:{
            type: String,
            required: [true, 'La descripción es requerido'],
            maxLength:[150, 'La descripción no puede sobrepasar de 150 caracteres']
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

leccionSchema.methods.getDescripcion = function(){
    return this.decripcion;
}

leccionSchema.methods.setDescripcion = function(descripción){
    this.decripcion = descripción
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

leccionSchema.methods.CacularPosiblePuntosMaximos = function(){
    return this.preguntas.length()
}




const leccion = mongoose.model("Leccion", usuarioSchema)

export default leccion;