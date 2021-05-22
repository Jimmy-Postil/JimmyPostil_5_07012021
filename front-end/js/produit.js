//Page produit//

//Récupération de l'id dans l'url
const params = new URLSearchParams(document.location.search.split('?')[1]);
const id = params.get("id");
console.log(id);

//Appel de l'API avec la récupération de l'id
const getProduct = async function () {
    let response = await fetch("http://localhost:3000/api/cameras/" + id);
    let camera = await response.json();
    console.log(camera);

    //Ajout des composants de la partie section-produit
    document.getElementById("camera-img").src = camera.imageUrl;
    document.getElementById("camera-title").innerHTML = camera.name;
    document.getElementById("camera-description").innerHTML = camera.description;
    document.getElementById("camera-price").innerHTML = camera.price / 100 + "€";

    // ajout des différents objectifs 
    const lenses = camera.lenses;

    for (i = 0; i < lenses.length; i++) {
        const selectOption = document.createElement('option');
        select = document.getElementById("objectif");
        select.appendChild(selectOption);
        selectOption.innerHTML = lenses[i];
        selectOption.setAttribute("value", lenses[i]);
    }

    //Initialisation du bouton d'ajout au panier et écoute de l'événement
    const btnPanier = document.getElementById("btn-panier");
    btnPanier.addEventListener("click", function (event) {
        event.preventDefault();
        let select = document.querySelector("select");
        if (select == 0) {
            alert('Vous devez choisir un objectif !');
        } else {
            let cameraPanier = {
                id: camera._id,
                imageUrl: camera.imageUrl,
                name: camera.name,
                description: camera.description,
                lenses: camera.lenses,
                price: camera.price,
                quantity: 1
            }
            let camPanier = JSON.stringify(cameraPanier);
            localStorage.setItem(camera._id, camPanier);
            alert("Votre choix à bien été ajouté à votre panier");
        }
    })
}
getProduct();




