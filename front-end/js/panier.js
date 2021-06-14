//Page panier

//fonction pour la mise en page des éléments
function addElement(elementType, parentElement, elementClasses = null, elementId = null) {
    let element = document.createElement(elementType);
    parentElement.appendChild(element);

    if (elementClasses)
        element.classList.add(...elementClasses);

    if (elementId)
        element.id = elementId;

    return element;
}


//Initialisation de la variable du prix total à 0
let calculPrice = 0;

//Récupération des données du localstorage
let camPanier = Object.keys(localStorage);
console.log(camPanier);

function emptyPanier(camPanier) {
    if (camPanier.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("middle");
        empty.innerHTML = "Aucun article n'a été ajouté, votre panier est vide.</br>Veuillez séléctionner un article afin de l'ajouter à votre panier.";
        empty.style.color = "red";
        empty.style.fontSize = "2rem";
        let sectionPanier = document.getElementById("section-panier");
        sectionPanier.appendChild(empty);
    }
}

emptyPanier(camPanier);

for (let i = 0; i < camPanier.length; i++) {
    let cam = JSON.parse(localStorage.getItem(camPanier[i]));
    console.log(cam);


    //Ajout des différents choix dans la section panier
    let sectionPanier = document.getElementById("section-panier");

    let containerPanier = addElement("div", sectionPanier, ["container"], "camera-" + cam.id);

    let rowPanier = addElement("div", containerPanier, ["row", "mt-5", "pt-3", "bo"]);

    let colimgPanier = addElement("div", rowPanier, ["col-12", "col-md-4", "col-lg-4", "col-xl-4"]);

    //image de la caméra
    let imgPanier = addElement("img", colimgPanier);
    imgPanier.src = cam.imageUrl;
    imgPanier.setAttribute("height", "150px");
    imgPanier.setAttribute("width", "100%");
    imgPanier.style.objectFit = "contain";

    let colcomposPanier = addElement("div", rowPanier, ["col-6", "col-md-4", "col-lg-4", "col-xl-4", "text-center"])

    //Nom
    let namePanier = addElement("h2", colcomposPanier);
    namePanier.innerHTML = cam.name;
    namePanier.style.color = "blue";

    //quantité
    let quantity = addElement("p", colcomposPanier);
    quantity.innerHTML = "Quantité : " + cam.quantity;

    //objectif
    let objectif = addElement("p", colcomposPanier);
    objectif.innerHTML = "objectif : " + cam.lenses;

    //prix
    let price = addElement("p", colcomposPanier, "price-" + cam.id);
    price.innerHTML = "Prix : " + cam.price / 100 + "€";

    let colbuttonPanier = addElement("div", rowPanier, ["col-6", "col-md-4", "col-lg-4", "col-xl-4", "text-center"])

    //Bouton supprimer du panier
    let buttonPanier = addElement("button", colbuttonPanier, ["btn", "btn-danger", "mt-5"], "remove-" + cam.id);
    buttonPanier.textContent = "Supprimer du panier";

    let containerPrice = addElement("div", sectionPanier, ["container"], "container")

    let rowPrice = addElement("div", containerPrice, ["row", "mt-3"]);

    let colPrice = addElement("div", rowPrice, ["col", "text-center"]);

    //Calcul du prix total
    calculPrice = calculPrice + (cam.price * cam.quantity / 100);

    let containerContinue = addElement("div", sectionPanier, ["container"]);

    let rowContinue = addElement("div", containerContinue, ["row"]);

    let colContinue = addElement("div", rowContinue, ["col"], "col-continue")
}

//Supression de la caméra dans le panier
function removeCamera(camPanier) {
    for (let i = 0; i < camPanier.length; i++) {
        document.getElementById("remove-" + camPanier[i]).addEventListener("click", function () {
            document.getElementById("camera-" + camPanier[i]).remove();
            let item = JSON.parse(localStorage.getItem(camPanier[i]));
            calculPrice = calculPrice - (item.price / 100);
            let idPrice = document.getElementById("price-panier");
            idPrice.innerHTML = "Prix total de votre panier : " + calculPrice + "€";
            localStorage.removeItem(camPanier[i]);

        })
    }
}

removeCamera(camPanier);

function panierPriceContinue(camPanier) {
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
}
panierPriceContinue(camPanier);

//Initialisation des éléments nécessaires du DOM à la vérification des données
let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let address = document.getElementById("adresse");
let city = document.getElementById("city");
let email = document.getElementById("email");

function getErrorMessage(element) {
    switch (element.id) {
        case "address": return "Veuillez rentrer une adresse correcte";
        case "city": return "Veuillez rentrer une ville existante";
        case "email": return "Veuillez renter un e-mail correcte";
        default: return "Ce champ contient des erreurs";
    }
}

function validateField(event) {
    if (event.currentTarget.validity.patternMismatch) {
        event.currentTarget.setCustomValidity(getErrorMessage(event.currentTarget));
    } else {
        event.currentTarget.setCustomValidity("");
    }
}
//Création des conditions pour la validité syntaxique des champs de formulaires
firstName.addEventListener("change", validateField)

lastName.addEventListener("change", validateField)

address.addEventListener("change", validateField);

city.addEventListener("change", validateField);

email.addEventListener("change", validateField);

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
            window.location = "confirmation.html";
        });
})

