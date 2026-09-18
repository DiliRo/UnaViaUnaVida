import Usuario from '../src/usuario/usuario.js'

export const findUser = async(id)=>{
    try{
        const userExist = await Usuario.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}