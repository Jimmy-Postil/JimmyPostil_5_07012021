//Page confirmation de commande

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

function initPage() {
    let confirmationContainer = document.getElementById("background-check");

    //Récupération du localStorage
    let confirm = Object.keys(localStorage);
    console.log(confirm);

    for (i = 0; i < confirm.length; i++) {
        let finalCommande = JSON.parse(localStorage.getItem(confirm[i]))

        //Création des éléments de la page
        let confirmationPrice = addElement("h1", confirmationContainer, ["title-confirm"]);
        confirmationPrice.innerHTML = "Merci pour votre commande d'un montant de " + finalCommande.prixTotal + "€";

        let confirmationDelai = addElement("p", confirmationContainer, ["title-confirm"]);
        confirmationDelai.innerHTML = "Votre colis sera expédié dans les plus brefs délais.";

        let confirmId = addElement("p", confirmationContainer, ["title-red"]);
        confirmId.innerHTML = "Voici votre numéro de commande : " + finalCommande.idCommande;
    }
    localStorage.clear();
}

initPage();
