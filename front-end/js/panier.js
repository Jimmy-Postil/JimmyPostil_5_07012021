//Page panier

//Initialisation du tableau productsId pour le formulaire
let productsId = [];

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
    objectif.innerHTML = "Objectif : " + cam.lenses[i];
    colcomposPanier.appendChild(objectif);

    //prix
    let price = document.createElement("p");
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
    calculPrice = calculPrice + (cam.price * cam.quantity);

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
    document.getElementById("camera-" + camPanier[i]).addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById(event.currentTarget.id).remove();
        localStorage.removeItem(camPanier[i]);
    })
}

if (camPanier.length > 0) {

    //Affichage du prix total
    sectionPanier = document.getElementById("section-panier");
    let pricePanier = document.createElement("p");
    pricePanier.innerHTML = "Prix total de votre panier : " + calculPrice / 100 + "€";
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

//Création de la classe client 

class Client {
    constructor(firstName, lastName, adress, city, email) {
        (this.firstName = firstName),
            (this.lastName = lastName),
            (this.adress = adress),
            (this.city = city),
            (this.email = email)
    }
}

//Création des conditions pour la validité syntaxique des champs de formulaires
let validite = document.getElementById("validation-commande");
validite.addEventListener("click", function (event) {
    event.preventDefault();


    //Vérification

})




