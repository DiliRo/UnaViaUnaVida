import { encrypt, checkPassword } from "../../utils/encrypt.js"
import { generateJwt } from "../../utils/jwt.js"
import Usuario from "../usuario/usuario.js";


export const register = async(req, res) =>{
    try {
        const data = req.body

        const existingUser = await Usuario.findOne({nombreUsuario: data.nombreUsuario})
        if(existingUser) return res.status(400).send({success: false, message:'Usuario ya existente'})
        
        const contrasenaEncriptada = await encrypt(data.contrasena)
        const nuevoUsuario = new Usuario({
            ...data,
            contrasena: contrasenaEncriptada,
            role: 'USER'
        })

        await nuevoUsuario.save()

        return res.send({success: true, message: 'Usuario creado'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General Error', err})
    }
}

export const login = async(req, res)=>{
    try {
        const data = req.body

        const usuario = await Usuario.findOne({nombreUsuario: data.nombreUsuario})
        if(!usuario) return res.status(404).send({success: false, message:'Usuario no existente'})

        const checkpassword = await checkPassword(usuario.contrasena ,data.contrasena)
        if(!checkPassword) return res.status(404).send({success: false, message:'Usuario no existente'})

        const payload = {uid: usuario._id, nombre: usuario.nombre, nombreUsuario: usuario.nombreUsuario, nivel: usuario.nivel}
        const token = await generateJwt(payload)

        return res.send({ success: true, message: `Welcome ${usuario.nombreUsuario}`, token})
    } catch (error) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General Error', err})
    }
}

