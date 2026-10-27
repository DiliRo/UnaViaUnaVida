'use strict'
import {hash , verify} from 'argon2'

export const encrypt = async(password)=> {
    try{
        return await hash(password)
    }catch(err){
        console.err(err)
        return err
    }
}

export const checkPassword = async(passwordHash, password)=>{
    try{
        return await verify(passwordHash, password)
    }catch(err){
        console.error(err)
    }
}