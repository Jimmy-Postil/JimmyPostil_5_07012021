//Page panier


//Initialisation de la variable du prix total à 0
let calculPrice = 0;

//Récupération des données du localstorage
let camPanier = Object.keys(localStorage);
console.log(camPanier);

if (camPanier.length === 0) {
    const empty = document.createElement("p");
    empty.classList.add("middle");
    empty.innerHTML = "Aucun article n'a été ajouté, votre panier est vide.</br>Veuillez séléctionner un article afin de l'ajouter à votre panier.";
    empty.style.color = "red";
    empty.style.fontSize = "2rem";
    let sectionPanier = document.getElementById("section-panier");
    sectionPanier.appendChild(empty);
}
for (let i = 0; i < camPanier.length; i++) {
    let cam = JSON.parse(localStorage.getItem(camPanier[i]));
    console.log(cam);


    //Ajout des différents choix dans la section panier
    let sectionPanier = document.getElementById("section-panier");
    let containerPanier = document.createElement("div");
    containerPanier.classList.add("container");
    containerPanier.id = "camera-" + cam.id;
    sectionPanier.appendChild(containerPanier);

    let rowPanier = document.createElement("div");
    rowPanier.classList.add("row", "mt-5", "pt-3", "bo");
    containerPanier.appendChild(rowPanier);

    let colimgPanier = document.createElement("div");
    colimgPanier.classList.add("col-12", "col-md-4", "col-lg-4", "col-xl-4");
    rowPanier.appendChild(colimgPanier);

    //image de la caméra
    let imgPanier = document.createElement("img");
    imgPanier.src = cam.imageUrl;
    imgPanier.setAttribute("height", "150px");
    imgPanier.setAttribute("width", "230px");
    colimgPanier.appendChild(imgPanier);

    let colcomposPanier = document.createElement("div");
    colcomposPanier.classList.add("col-6", "col-md-4", "col-lg-4", "col-xl-4");
    rowPanier.appendChild(colcomposPanier);

    //Nom
    let namePanier = document.createElement("h2");
    namePanier.innerHTML = cam.name;
    namePanier.style.color = "blue";
    colcomposPanier.appendChild(namePanier);

    //quantité
    let quantity = document.createElement("p");
    quantity.innerHTML = "Quantité : " + cam.quantity;
    colcomposPanier.appendChild(quantity);

    //objectif
    let objectif = document.createElement("p");
    objectif.innerHTML = "Objectif : " + cam.lenses;
    colcomposPanier.appendChild(objectif);

    //prix
    let price = document.createElement("p");
    price.id = "price-" + cam.id;
    price.innerHTML = "Prix : " + cam.price / 100 + "€";

    colcomposPanier.appendChild(price);

    let colbuttonPanier = document.createElement("div");
    colbuttonPanier.classList.add("col-6", "col-md-4", "col-lg-4", "col-xl-4");
    rowPanier.appendChild(colbuttonPanier);

    //Bouton supprimer du panier
    let buttonPanier = document.createElement("button");
    buttonPanier.classList.add("btn", "btn-danger");
    buttonPanier.setAttribute("id", "remove-" + cam.id)
    buttonPanier.textContent = "Supprimer du panier";
    colbuttonPanier.appendChild(buttonPanier);


    let containerPrice = document.createElement("div");
    containerPrice.classList.add("container");
    containerPrice.setAttribute("id", "container");
    sectionPanier.appendChild(containerPrice);

    let rowPrice = document.createElement("div");
    rowPrice.classList.add("row", "mt-3");
    containerPrice.appendChild(rowPrice);

    colPrice = document.createElement("div");
    colPrice.classList.add("col", "text-center");
    rowPrice.appendChild(colPrice);

    //Calcul du prix total
    calculPrice = calculPrice + (cam.price * cam.quantity / 100);

    let containerContinue = document.createElement("div");
    containerContinue.classList.add("container");
    sectionPanier.appendChild(containerContinue);

    let rowContinue = document.createElement("div");
    rowContinue.classList.add("row");
    containerContinue.appendChild(rowContinue);

    let colContinue = document.createElement('div');
    colContinue.classList.add("col");
    colContinue.setAttribute("id", "col-continue");
    rowContinue.appendChild(colContinue);

}

//Supression de la caméra dans le panier
for (let i = 0; i < camPanier.length; i++) {
    document.getElementById("remove-" + camPanier[i]).addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("camera-" + camPanier[i]).remove();
        let item = JSON.parse(localStorage.getItem(camPanier[i]));
        calculPrice = calculPrice - (item.price / 100);
        console.log(calculPrice, calculPrice - (item.price / 100))
        let idPrice = document.getElementById("price-panier");
        idPrice.innerHTML = "Prix total de votre panier : " + calculPrice + "€";
        localStorage.removeItem(camPanier[i]);

    })
}

if (camPanier.length > 0) {

    //Affichage du prix total
    sectionPanier = document.getElementById("section-panier");
    let pricePanier = document.createElement("p");
    pricePanier.id = "price-panier";
    pricePanier.innerHTML = "Prix total de votre panier : " + calculPrice + "€";
    pricePanier.classList.add("cent");
    sectionPanier.appendChild(pricePanier);


    //Bouton continuer mes achats
    sectionPanier = document.getElementById("section-panier");
    let linkContinue = document.createElement("a");
    linkContinue.href = "index.html";
    sectionPanier.appendChild(linkContinue);
    let buttonContinue = document.createElement("button");
    buttonContinue.classList.add("btn", "btn-primary");
    buttonContinue.textContent = "Continuer mes achats";
    linkContinue.appendChild(buttonContinue);

}

//Initialisation des éléments nécessaires du DOM à la vérification des données
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let address = document.getElementById("adresse");
let city = document.getElementById("city");
let email = document.getElementById("email");

//Création des conditions pour la validité syntaxique des champs de formulaires
firstName.addEventListener("change", function () {
    if (firstName.validity.patternMismatch) {
        firstName.setCustomValidity("Ce champ contient des erreurs");
    } else {
        firstName.setCustomValidity("");
    }
})

lastName.addEventListener("change", function () {
    if (lastName.validity.patternMismatch) {
        lastName.setCustomValidity("Ce champ contient des erreurs");
    } else {
        lastName.setCustomValidity("");
    }
})

address.addEventListener("change", function () {
    if (address.validity.patternMismatch) {
        address.setCustomValidity("Veuillez rentrer une adresse correcte");
    } else {
        address.setCustomValidity("");
    }
})

city.addEventListener("change", function () {
    if (city.validity.patternMismatch) {
        city.setCustomValidity("Veuillez rentrer une ville existante");
    } else {
        city.setCustomValidity("");
    }
})

email.addEventListener("change", function () {
    if (email.validity.patternMismatch) {
        email.setCustomValidity("Veuillez renter un e-mail correcte");
    } else {
        email.setCustomValidity("");
    }
})

//Ecoute du bouton d'envoi des données pour finaliser la commande
let validite = document.getElementById("validation-commande");
validite.addEventListener("submit", function (event) {

    event.preventDefault();

    //Création de l'objet contact avec la récupération des données entrées par l'utilisateur
    let productsId = [];
    let resultat = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: productsId
    }
    console.log(resultat);

    //Envoi des données au serveur avec fetch et la méthode POST
    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resultat)
    })
        //réponse du serveur
        .then(response => response.json())
        .then(data => {
            localStorage.clear();
            let confirmCommande = {
                idCommande: data.orderId,
                prixTotal: calculPrice
            }
            console.log(confirmCommande);
            let commande = JSON.stringify(confirmCommande);
            localStorage.setItem("commande", commande);
        })
})


