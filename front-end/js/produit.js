//Récupération de l'id dans l'url
const cameraId = location.search.split("=")[1];
console.log(cameraId);

//Appel de l'API avec la récupération de l'id

 fetch("http://localhost:3000/api/cameras/" + cameraId)
        .then(response => response.json())
        .then(data => {document.getElementById("camera-title").innerHTML = data.name})
        (data => {document.getElementById("camera-img").innerHTML = data.imageUrl})
        (data => {document.getElementById("camera-description").innerHTML = data.description})
        (data => {document.getElementById("objectif").innerHTML = data.lenses})
        (data => {document.getElementById("camera-price").innerHTML = data.price});
