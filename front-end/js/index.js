//Page d'accueil

//fonction pour la mise en page des éléments
function addElement(elementType, parentElement = null, elementClasses = null, elementId = null) {
    let element = document.createElement(elementType);
    parentElement.appendChild(element);

    if (elementClasses)
        element.classList.add(...elementClasses);

    if (elementId)
        element.id = elementId;

    return element;
}

function colConstructor(cameras) {
    const nodes = []
    //Boucle pour récupérer chaque caméras
    for (let i = 0; i < cameras.length; i++) {

        let containerCards = document.getElementById("container");

        //Création de la div col
        let colDiv = addElement("div", containerCards, ["col-12", "col-md-6", "col-lg-6", "col-xl-6", "mt-4", "mx-auto"])

        //Création des cards
        let cardDiv = addElement("div", colDiv, ["card", "w-100", "shadow-lg"]);

        //Création des images et de la div card-body
        let cardImg = addElement("img", cardDiv, ["card-img-top"]);
        cardImg.src = cameras[i].imageUrl;

        let cardBody = addElement("div", cardDiv, ["card-body"]);

        //Création des 3 enfants du div card-body (h5, p, a)
        let cardTitle = addElement("h5", cardBody, ["card-title"]);
        cardTitle.innerHTML = cameras[i].name;

        let cardText = addElement("p", cardBody, ["card-text"]);
        cardText.innerHTML = cameras[i].price / 100 + "€";

        let cardLink = addElement("a", cardBody, ["btn", "btn-primary", "btn-choice"])
        cardLink.href = "produit.html?id=" + cameras[i]._id;
        cardLink.textContent = "En savoir plus";

        nodes.push(colDiv)
    }
    return nodes
}

function layout(HTMLElements, rowDiv, camerasContainer) {

    //Création de la boucle et de la condition pour la mise en page de 2 div col par row et d'un container par row
    let counter = 1;
    for (let cameras of HTMLElements) {
        if (counter <= 2) {
            rowDiv.appendChild(cameras);
            counter++;
        }
        if (counter > 2) {
            counter = 1;
            camerasContainer.appendChild(rowDiv);
            rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
        }
    }
    if (counter >= 2) {
        camerasContainer.appendChild(rowDiv);
    }
}

//Récupération des données de l'API

const getCameras = function () {
    let response = fetch("http://localhost:3000/api/cameras")
        .then(response => response.json())
        .then((jsonData) => colConstructor(jsonData))
        .then(HTMLElements => {
            console.log(HTMLElements);
            //Création du div container et du div row
            let camerasContainer = document.getElementById("sectionCameras");
            camerasContainer.classList.add("container");

            let rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            layout(HTMLElements, rowDiv, camerasContainer);
        })
}




//Appel de la fonction
getCameras()