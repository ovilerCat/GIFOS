'use strict';
//Creamos nuestras variables.
let resultadoFinal = document.getElementById('resultadoFinal');
let resultadoBusqueda = document.getElementById('resultadoGifos');
let searchInput = document.getElementById('searchInput');
let searchCont = document.getElementById('searchbarCtn');
let offSet = 0;
let contBusqueda = document.getElementById('busqueda');
let lupaVioleta = document.getElementById('lupa-violeta');
let cerrar = document.getElementById('cerrar');
let lupaGris = document.getElementById('lupa-gris');
//Iniciamos un evento cada vez que un dedo se levante de una tecla(para mostrar las sugerencias en tiempo real).
searchInput.addEventListener('keyup', buscador);

searchInput.addEventListener('focusin', mostrarLupaX);
//Función para mostrar la lupa gris y sacar la lupa violeta.
function mostrarLupaX() {
    lupaVioleta.style.display = 'none';
    cerrar.style.display = 'initial';
    lupaGris.style.display = 'initial';
}
searchInput.addEventListener('focusout', sacarLupa);
//Función para mostrar la lupa violeta y sacar la lupa gris y botón de cerrar.
function sacarLupa() {
    lupaGris.style.display = 'none';
    cerrar.style.display = 'none';
    lupaVioleta.style.display = 'initial';
}

//Inicia nuestra funcion buscador.
function buscador() {
    // La variable busqueda es ingual al valor del input (lo que estoy ingresando por teclado).
    let busqueda = searchInput.value;
    if (busqueda.length >= 1) {
        //Si hay mas de una letra comienza a mostrar sugerencias.
        fetch(`https://api.giphy.com/v1/tags/related/${busqueda}?=&api_key=${apiKey}&limit=4&lang=es`)
            .then(response => response.json())
            .then(request => sugerenciasData(request))
            .catch(error => console.error("Fallo: ", error));
    }
    //  else {
    //     Cambiar estilos para lupa y X
    // }
}
//Nuestra función para mostrar las sugerencias.
function sugerenciasData(objeto) {
    let sugerencia = objeto.data;
    //Nos llevamos lo que nos trae el fetch, o sea las sugerencias, y las mostramos una por una (con console.log).
    console.log("sugerencia:", sugerencia[0].name);
    //CAMBIO: creamos una variable y creamos un parrafo.
    let text = document.createElement('p');
    //CAMBIO: a ese parrafo le ponemos como contenido nuestra sugerencia 0(arreglo) su nombre.
    text.textContent = sugerencia[0].name;
    //CAMBIO: finalmente apendeamos esa variable en nuestro contenedor para que muestre la palabra por pantalla.
    searchCont.appendChild(text);
    //mostrar() es otra función para justamente mostrar los gifs de una busqueda.

    //CAMBIO: comenté este mostrar() para que no muestre a cada rato busquedas de las sugerencias.+++++++++++++++++++++++++++
    // mostrar();
}


function mostrar() {
    //Guardamos nuestro url de la consulta con la api para posteriormente hacerle un fetch.
    let urlBusqueda = (`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offSet}&rating=g&lang=es&q=`);
    //searchInput recordá que es el mismo input, por lo tanto searchInput.value es lo que ingreses en ese input (.trim() para sacar los espacios).
    let strBusqueda = searchInput.value.trim();
    //¿Viste la url de arriba? bien, le concatenamos (.concat()) lo que queremos buscar.
    urlBusqueda = urlBusqueda.concat(strBusqueda);
    //Ahora si mandamos la consulta.
    fetch(urlBusqueda)
        //Lo parseamos a json.
        .then(response => response.json())
        //Recordemos que cada .then inicia una pequeña arrayFunction(EXPLICO DESPUES DE SER NECESARIO).
        .then(content => {
            //La variable obj que habia declarado afuera le doy el valor de data, o sea del arreglo con los 12 objetos.
            let obj = content.data;
            //Realmente no se por que Nico pidio que agregue este innerHTML (LO VEMOS DESPUES).
            if (offSet == 0) {
                resultadoBusqueda.innerHTML = '';
                //Este es mi contenedor de los gifs y el la palabra que busqué.
                let contFinal = document.getElementById('resultadoGifos');
                //Creo un parrafo para mostrar la palabra que busqué.
                let titulo = document.createElement('p');
                //Le pongo como textContent el valor del input.
                titulo.textContent = searchInput.value;
                //Lo apendeo en el contenedor.
                contFinal.appendChild(titulo);
            }
            //Si no buscamos nada == ERROR
            if (content.data = 0) {
                resultadoBusqueda.innerHTML = `<div><img src=""><p>Error</p></div>`
            }
            //else comienza con todo el proceso para mostrar cada gif.
            else {
                //Acordate que obj es la varible a donde guardamos el arreglo con los objetos que retorna.
                for (let i = 0; i < obj.length; i++) {
                    //Va a la funcion para mostrarlos por cada objeto que trajo.
                    traerGifs(obj[i]);
                }
            }
        }).catch(error => console.error("Fallo:", error));

}
//Función para mostrarlos, pide un valor para ejecutarse -fijate en el for- le damos como valor obj[i] (SI NO SE ENTIENDE LO VEMOS).
function traerGifs(object) {
    //Y por cada uno crea un div que contiene un img con el url del gif.
    resultadoBusqueda.innerHTML += `<div class="gif"><img src="${object.images.fixed_width.url}"></div>` //En este caso usamos 'fixed_width', Nico uso 'downsized' que muestra el gif pero comprobé que tarda mas en traerlos.
}

document.getElementById('verMas').addEventListener('click', verMas);

function verMas(params) {
    offSet += 12;
    mostrar();
}