import mongoose from "mongoose";

const preguntaSchema = new mongoose.Schema(
    {
        enunciado:{
            type: String,
            required: [true, 'El enunciado es requerido'],
            maxLength:[100, 'El enunciado no puede sobrepasar de 100 caracteres']
        },
        opciones:[
            {
                texto:{
                    type: String,
                    required: [true, 'El texto es requerido'],
                },
                esCorrecta:{
                    type: Boolean,
                    required: [true, 'El texto es requerido'],
                }
            }
        ],
        retroalimentacion:{
            type: String,
            required: [true, 'La retroalimentación es requerido'],
            maxLength:[150, 'La retroalimentación  no puede sobrepasar de 100 caracteres']
        }
    }
)

preguntaSchema.methods.getIdPregunta = function(){
    return this._id;
}

preguntaSchema.methods.getEnunciado = function(){
    return this.enunciado;
}

preguntaSchema.methods.setEnunciado = function(enunciado){
    this.enunciado = enunciado;
}

preguntaSchema.methods.getOpciones = function(){
    return this.opciones;
}

preguntaSchema.methods.getRetroalimentacion = function(){
    return this.retroalimentacion;
}

preguntaSchema.methods.setRetroalimentacion = function(retroalimentacion){
    this.retroalimentacion = retroalimentacion;
}

preguntaSchema.methods.VerificarRespuesta = function (idOpcion) {
    const opcion = this.opciones.id(idOpcion)

    if (!opcion) {
        throw new Error('La opción no pertenece a esta pregunta')
    }

    return opcion.esCorrecta
}


const pregunta = mongoose.model('Pregunta', preguntaSchema)

export default pregunta