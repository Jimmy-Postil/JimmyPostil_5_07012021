//Page d'accueil

function colConstructor(cameras) {
    const nodes = []
    //Boucle pour récupérer chaque caméras
    for (let i = 0; i < cameras.length; i++) {

        //Création de la div col
        let colDiv = document.createElement("div");
        colDiv.classList.add("col-12", "col-md-6", "col-lg-6", "col-xl-6", "mt-4", "mx-auto");

        //Création des cards
        let cardDiv = document.createElement("div");
        colDiv.appendChild(cardDiv);
        cardDiv.classList.add("card", "w-100", "shadow-lg");

        //Création des images et de la div card-body
        let cardImg = document.createElement("img");
        cardDiv.appendChild(cardImg);
        cardImg.classList.add('card-img-top');
        cardImg.src = cameras[i].imageUrl;

        let cardBody = document.createElement("div");
        cardDiv.appendChild(cardBody);
        cardBody.classList.add("card-body");

        //Création des 3 enfants du div card-body (h5, p, a)
        let cardTitle = document.createElement("h5");
        cardBody.appendChild(cardTitle);
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = cameras[i].name;

        let cardText = document.createElement("p");
        cardBody.appendChild(cardText);
        cardText.classList.add("card-text");
        cardText.innerHTML = cameras[i].price / 100 + "€";

        let cardLink = document.createElement("a");
        cardBody.appendChild(cardLink);
        cardLink.classList.add("btn", "btn-primary", "btn-choice");
        cardLink.href = "produit.html?id=" + cameras[i]._id;
        cardLink.textContent = "En savoir plus";

        nodes.push(colDiv)
    }
    return nodes
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

            //Création de la boucle et de la condition pour la mise en page de 2 div col par row et d'un container par row
            let counter = 1;
            for (let cameras of HTMLElements) {
                if (counter <= 2) {
                    rowDiv.appendChild(cameras);
                    counter++;
                } 
                if (counter >2) {
                    counter = 1;
                    camerasContainer.appendChild(rowDiv);
                    rowDiv = document.createElement("div");
                    rowDiv.classList.add("row");
                }
            }
            if (counter >=2){
            camerasContainer.appendChild(rowDiv);
            }
        })
}


//Appel de la fonction
getCameras()