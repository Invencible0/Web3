function obtenerMensaje(){

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Mensaje obtenido correctamente")
        }, 2000)
    })

}