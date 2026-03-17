setTimeout(()=>{
    console.log("Paso 1")

    setTimeout(()=>{
        console.log("Paso 2")

        setTimeout(()=>{
            console.log("Paso 3")
        },1000)

    },1000)

},1000)

function esperar(seg){
    return new Promise(resolve=>setTimeout(resolve,seg))
}

async function ejecutar(){

    await esperar(1000)
    console.log("Paso 1")

    await esperar(1000)
    console.log("Paso 2")

    await esperar(1000)
    console.log("Paso 3")

}

ejecutar()