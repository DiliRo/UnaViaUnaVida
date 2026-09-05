class usuario{
    #idUsuario;
    #nombre;
    #nombreUsuario;
    #contrasena;
    #nivel;
    #racha;
    #puntos;
    #amigos

    constructor(){}

    constructor(nombre, nombreUsuario, contrasena){
        this.#amigos = nombre;
        this.#nombreUsuario = nombreUsuario;
        this.#contrasena = contrasena;
        this.#nivel = 1;
        this.#racha = 0;
        this.#puntos = 0;
        this.#amigos = []
    }

    getIdUsuario(){
        return this.#idUsuario;
    }

    setNombre(nombre){
        this.#nombre = nombre;
    }

    getNombre(){
        return this.#nombre;
    }

    setNombreUsuario(nombreUsuario){
        this.#nombreUsuario = nombreUsuario;
    }

    getNombreUsuario(){
        return this.#nombreUsuario;
    }

    setContrasena(contrasena){
        this.#contrasena = contrasena;
    }

    getContrasena(){
        return this.#contrasena;
    }

    setNivel(nivel){
        this.#nivel = nivel;
    }

    getNivel(){
        return this.#nivel;
    }

    setRacha(racha){
        this.#racha = racha;
    }

    getRacha(){
        return this.#racha;
    }

    setPuntos(puntos){
        this.#puntos = puntos;
    }
    
    getPuntos(){
        return this.#puntos;
    }

    setAmigos(amigos){
        this.#amigos.push(amigos);
    }

    getAmigos(){
        return this.#amigos;
    }
}

module.exports = usuario;