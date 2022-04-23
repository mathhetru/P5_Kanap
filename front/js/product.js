//RECUPERATION DE L'ID DANS L'URL
var str = window.location.href;
var url = new URL(str);
var idURL = url.searchParams.get("id");


//APPEL API AVEC L'ID DU PRODUIT
var requestURL = "http://localhost:3000/api/products/" + idURL
var request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();
var productUnit = "";
request.onload = function (){
    productUnit = request.response;
    showProduct(productUnit);
}

//AFFICHAGE DU PRODUIT PAR PAGE PRODUIT
function showProduct(productSheet) {
    document.title = productSheet.name;
    let panelIMG = document.querySelector('.item__img');

    // insertion image du canapé
    var createPict = document.createElement('img');
    createPict.setAttribute('src', productSheet.imageUrl);
    createPict.setAttribute('alt', productSheet.altTxt);
    panelIMG.appendChild(createPict);

    // insertion du nom du canapé
    let panelH1 = document.querySelector('#title');
    panelH1.textContent = productSheet.name;

    // insertion du prix du canapé
    let panelPrice = document.querySelector('#price');
    panelPrice.textContent = productSheet.price;

    // insertion du choix du canapé
    let panelDescription = document.querySelector('#description');
    panelDescription.textContent = productSheet.description;

    // récupération de #colors
    let panelOption = document.querySelector('#colors');

    // insertion du tableau des couleurs dans une variable
    var colors = productSheet.colors;

    // parcours du tableau de couleurs et insertion de celles-ci dans choix 
    for (var i = 0; i < colors.length; i++){
        var colorProduct = colors[i]; 
        var createOption = document.createElement('option');
        createOption.setAttribute('value', colorProduct);
        createOption.textContent = colorProduct;
        panelOption.appendChild(createOption);
    }
}

//ADD TO LOCALSTORAGE

// récupération de #colors, #quantity et #addToCard
let chosenColor = document.querySelector('#colors');
let chosenQuantity = document.querySelector('#quantity');
let sendToBasket = document.querySelector('#addToCart');

// écoute du click sur l'ajout au panier
sendToBasket.addEventListener('click', function (event) {
    // ajout du localstorage dans une variable
    var stockBasket = localStorage;

    // récupération des valeurs de quantité et de couleurs dans des variables
    let valueColor = chosenColor.value; 
    let valueQuantity = chosenQuantity.value;

    //ajout des indications du produit (pour l'ajout au panier)
    let infoChosenProduct = {
        id: productUnit._id,
        nom: productUnit.name,
        prix: productUnit.price,
        couleur: valueColor,
        quantité: valueQuantity,
    }
    let lineInfoChosenProduct = JSON.stringify(infoChosenProduct)
    
    // si la valeur de la quantité est supérieur à 1 et inférieur ou égale à 0 ALORS ajouter au panier

    if (valueQuantity == 0 || valueQuantity > 100 || valueColor == "") { 
        window.alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé")
    } else { 
        stockBasket.setItem('StrPanier', lineInfoChosenProduct)
    }
    console.log(stockBasket)
});
    /*
    if (valueQuantity > 1 && valueQuantity <= 100 && valueColor != ""){
        stockBasket.setItem('StrPanier', lineInfoChosenProduct)
    } else { 
        window.alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé")
    }
    console.log(stockBasket)
});

    // l'envoyer à la page panier
    // /!\ si un element est déjà dans le panier
    // faire une popup de confirmation*/