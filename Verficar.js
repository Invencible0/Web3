function miFuncion(cadena){

    // Convertir la cadena en minúsculas
    cadena = cadena.toLowerCase()

    // Invertir la cadena
    let invertida = cadena.split("").reverse().join("")

    // Comparar
    if(cadena === invertida){
        return true
    }else{
        return false
    }
}

let band = miFuncion("oruro")
console.log(band) // true

let band2 = miFuncion("hola")
console.log(band2) // false