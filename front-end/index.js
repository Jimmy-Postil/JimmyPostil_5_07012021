//Page d'accueil

//Récupération des données de l'API

const getCameras = function () {
    let response = fetch("http://localhost:3000/api/cameras")
        .then(response => response.json())
        .then(cameras => {

            //Boucle pour récupérer chaque caméras
            for (let i = 0; i < cameras.length; i++) {

                //Création de la div container
                let camerasDiv = document.getElementById("cameras");
                let camerasContainer = document.createElement("div");
                camerasDiv.appendChild(camerasContainer);
                camerasContainer.classList.add("container");

                //Création des div row et col
                let rowDiv = document.createElement('div');
                camerasContainer.appendChild(rowDiv);
                rowDiv.classList.add("row");

                let colDiv = document.createElement("div");
                rowDiv.appendChild(colDiv);
                colDiv.classList.add("col-12", "col-md-6", "col-lg-6", "col-xl-6", "mt-4");

                //Création des cards
                let cardDiv = document.createElement("div");
                colDiv.appendChild(cardDiv);
                cardDiv.classList.add("card", "w-100", "shadow-lg");

                //Création des images et de la div card-body
                let cardImg = document.createElement("img");
                cardDiv.appendChild(cardImg);
                cardImg.classList.add('card-img-top');
                cardImg.src = cameras.imageUrl;

                let cardBody = document.createElement("div");
                cardDiv.appendChild(cardBody);
                cardBody.classList.add("card-body");

                //Création des 3 enfants du div card-body (h5, p, a)
                let cardTitle = document.createElement("h5");
                cardBody.appendChild(cardTitle);
                cardTitle.classList.add("card-title");
                cardTitle.innerHTML = cameras.name;

                let cardText = document.createElement("p");
                cardBody.appendChild(cardText);
                cardText.classList.add("card-text");
                cardText.innerHTML = cameras.price / 100 + "€";

                let cardLink = document.createElement("a");
                cardBody.appendChild(cardLink);
                cardLink.classList.add("btn", "btn-primary");
                cardLink.href = cameras._id;
            }
        })
}

//Appel de la fonction
getCameras()