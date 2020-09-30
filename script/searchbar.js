'use strict';
//Creamos nuestras variables.
let resultadoFinal = document.getElementById('resultadoFinal');
let resultadoBusqueda = document.getElementById('resultadoGifos')
let searchInput = document.getElementById("searchInput");
let searchCont = document.getElementById('searchbarCtn');
let busqueda;
//Iniciamos un evento cada vez que un dedo se levante de una tecla(para mostrar las sugerencias en tiempo real).
searchInput.addEventListener('keyup', buscador);
//Inicia nuestra funcion buscador.
function buscador() {
    // La variable busqueda es ingual al valor del input (lo que estoy ingresando por teclado).
    busqueda = searchInput.value;
    if (busqueda.length >= 1) {
        //Si hay mas de una letra comienza a mostrar sugerencias.
        fetch(`https://api.giphy.com/v1/tags/related/${busqueda}?=&api_key=${apiKey}&limit=4&lang=es`)
            .then(response => response.json())
            .then(data => sugerenciasData(data))
            .catch(error => console.error("Fallo: ", error));
    }
    //  else {
    //     Cambiar estilos para lupa y X
    // }
}
//Nuestra función para mostrar las sugerencias.
function sugerenciasData(data) {
    let sugerencia = data.data;
    //Nos llevamos lo que nos trae el fetch, o sea las sugerencias, y las mostramos una por una (con console.log).
    console.log(sugerencia[0].name);
    //mostrar() es otra función para justamente mostrar los gifs de una busqueda.
    mostrar();
}
//Cree esta variable por que realmente no me salia el código de Nico, así que cambié varias cosas.
let obj;

function mostrar() {
    //Guardamos nuestro url de la consulta con la api para posteriormente hacerle un fetch.
    let urlBusqueda = (`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=0&rating=g&lang=es&q=`);
    //searchInput recordá que es el mismo input, por lo tanto searchInput.value es lo que ingreses en ese input (.trim() para sacar los espacios).
    let strBusqueda = (searchInput.value.trim());
    //¿Viste la url de arriba? bien, le concatenamos (.concat()) lo que queremos buscar.
    urlBusqueda = urlBusqueda.concat(strBusqueda);
    //Ahora si mandamos la consulta.
    fetch(urlBusqueda)
        //Lo parseamos a json.
        .then(response => response.json())
        //Recordemos que cada .then inicia una pequeña arrayFunction(EXPLICO DESPUES DE SER NECESARIO).
        .then(content => {
            //La variable obj que habia declarado afuera le doy el valor de data, o sea del arreglo con los 12 objetos.
            obj = content.data;
            //Realmente no se por que Nico pidio que agregue este innerHTML (LO VEMOS DESPUES).
            resultadoBusqueda.innerHTML = '';
            //Este es mi contenedor de los gifs y el la palabra que busqué.
            let contFinal = document.getElementById('resultadoGifos');
            //Creo un parrafo para mostrar la palabra que busqué.
            let titulo = document.createElement('p');
            //Le pongo como textContent el valor del input.
            titulo.textContent = searchInput.value;
            //Lo apendeo en el contenedor.
            contFinal.appendChild(titulo);
            //Si no buscamos nada == ERROR
            if (content.data = 0) {
                resultadoBusqueda.innerHTML = `
                <div><img src=""><p>Error</p></div>`
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
function traerGifs(objet) {
    //Y por cada uno crea un div que contiene un img con el url del gif.
    resultadoBusqueda.innerHTML += `<div class="gif"><img src="${objet.images.fixed_width.url}"></div>` //En este caso usamos 'fixed_width', Nico uso 'downsized' que muestra el gif pero comprobé que tarda mas en traerlos.
}


// Este código tiene muchas cosas por corregir todavía, cada vez que quieras hacer una consulta recomiendo que recargues la página.
//Gifs.scss es quien le da los estilos a cada gif y todo el conetendor ese.