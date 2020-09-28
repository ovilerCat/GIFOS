const apiKey = "Q67KW48BpjSLZCsmCNVElQf3udb21KOW";

let contAll = document.getElementById("trends");
async function buscar() {
    try {
        //Acá llamo a la API
        let request = await (fetch(`https://api.giphy.com/v1/trending/searches?&api_key=${apiKey}`));
        //Lo parseo a json
        let response = await request.json();
        //Creo el párrafo que va a contener lo que devuelve la API
        let text = document.createElement('p');
        //Recorto 15 elementos del array que me devolvió (del 5 al 20)
        response.data.splice(5, 20);
        //Agrego una coma entre cada elemento
        text.textContent = response.data.join(", ");
        contAll.appendChild(text);
    } catch (error) {
        console.log("Error:", error);
    }
}
buscar();
//Esto es para mostrar un gif
// async function buscar() {
//     try {
//         let request = await (fetch(`https://api.giphy.com/v1/gifs/random?api_key=bPvCCZM88k66UZXoKNKFiP66bA1HCe4B&tag=&rating=g`));
//         let response = await request.json();
//         console.log(response);
//         let gif = document.createElement('div');
//         let text = document.createElement('p');
//         text.textContent = response.data[0];
//         gif.style.width = "200px";
//         gif.style.height = "200px";
//         gif.style.backgroundSize = "contain";
//         gif.style.backgroundImage = `url(${response.data.images.fixed_width.url})`;
//         contAll.appendChild(text);
//         contAll.appendChild(gif);
//     } catch (error) {
//         console.log("Error:", error);
//     }
// }