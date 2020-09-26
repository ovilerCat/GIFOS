const apiKey = "Q67KW48BpjSLZCsmCNVElQf3udb21KOW";

function buscar(){
    let data = fetch(`http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${apiKey}&limit=5`)
    .then(data => data.json())
    .then(console.log(data));
}
