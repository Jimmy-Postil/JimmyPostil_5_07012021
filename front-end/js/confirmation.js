//Page confirmation de commande
let confirmationContainer = document.getElementById("background-check");

//Récupération du localStorage
let confirm = Object.keys(localStorage);
console.log(confirm);

for (i = 0; 1 < confirm.length; i++) {
    let finalCommande = JSON.parse(localStorage.getItem(confirm[i]))

    //Création des éléments de la page
    let confirmationPrice = document.createElement("h1");
    confirmationPrice.classList.add("title-confirm");
    confirmationPrice.innerHTML = "Merci pour votre commande d'un montant de : " + finalCommande.prixTotal + "€";
    confirmationContainer.appendChild(confirmationPrice);

    let confirmationDelai = document.createElement("p");
    confirmationDelai.classList.add("title-confirm");
    confirmationDelai.innerHTML = "Votre colis sera expédié dans les plus brefs délais"
    confirmationContainer.appendChild(confirmationDelai);

    confirmId = document.createElement("p");
    confirmId.classList.add("title-red");
    confirmId.innerHTML = "Voici votre numéro de commande : " + finalCommande.idCommande;
    confirmationContainer.appendChild(confirmId);
}
localStorage.removeItem("commande");