//Récupération de l'id dans l'URL
var str = window.location.href;
var url = new URL(str);
var idURL = url.searchParams.get("id");

/* var requestURL = "http://localhost:3000/api/products/" + idURL
var request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();
var productUnit = "";
request.onload = function (){
    productUnit = request.response;
    showProduct(productUnit);
}*/

//Appel API avec l'id du produit
var productUnit = "";
var requestURL = "http://localhost:3000/api/products/" + idURL
fetch(requestURL)
.then(response => response.json())
.then(async function (resultatAPI) {
    productUnit = await resultatAPI;
    showProduct(productUnit);
})
.catch(error => alert("Erreur : " + error));

//Affichage du produit par page produit
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

//Ajouter au localstorage

// récupération de #colors, #quantity et #addToCard
let chosenColor = document.querySelector('#colors');
let chosenQuantity = document.querySelector('#quantity');
let sendToBasket = document.querySelector('#addToCart');

// écoute du click sur l'ajout au panier
sendToBasket.addEventListener('click', function (event) {
     // récupération des valeurs de quantité et de couleurs du produit choisi dans des variables
    let valueColor = chosenColor.value; 
    let valueQuantity = chosenQuantity.value;
    if (valueQuantity <= 0 || valueQuantity > 100 || valueColor == ""){
        alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé");
    } else {
        // récupération du contenu du panier (sans produit choisi de la page actuel)
        let basketStr = localStorage.getItem('basket');
        if (basketStr == null) {
            var basket = {
                // totalPrice: 0,
                totalQuantity: 0,
                products: []
            }
        } else { 
            var basket = JSON.parse(basketStr)
        }

        // creation du produit choisi
        let chosenProduct = {
            id: productUnit._id,
            name: productUnit.name,
            // price: productUnit.price,
            color: valueColor,
            quantity: Number(valueQuantity),
            img: productUnit.imageUrl,
        }

        // ajout de la quantité du produit choisi à la quantité des produits dans le panier (SI ils ont le même id et même color)
        boolean = false;
        for (var i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i];
            if (basketProduct.id == chosenProduct.id && basketProduct.color == chosenProduct.color) {
                newQuantity = basketProduct.quantity + chosenProduct.quantity;
                basketProduct.quantity = newQuantity;
                basket.totalQuantity = chosenProduct.quantity + basket.totalQuantity;
                // totalChosenPrice = chosenProduct.quantity * chosenProduct.price;
                // basket.totalPrice = totalChosenPrice + basket.totalPrice;
                boolean = true;
                break;
            }
        } 

        // ajout du produit choisi dans le panier (SI ils ont pas le même id et même color)
        if (boolean == false) {
            basket.products.push(chosenProduct);
            newQuantity = basket.totalQuantity + chosenProduct.quantity;
            basket.totalQuantity = newQuantity;
            // newPrice = basket.totalPrice + (chosenProduct.price * chosenProduct.quantity);
            // basket.totalPrice = newPrice;
        }
        alert('Votre commande de ' + chosenProduct.quantity + ' ' + productUnit.name + ' ' + chosenProduct.color + ' est bien ajoutée au panier !');
        let lineBasket = JSON.stringify(basket);
        localStorage.setItem("basket", lineBasket);
        window.location.reload();
        /*for (var i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i];
            if (basketProduct.id == chosenProduct.id && basketProduct.color == chosenProduct.color) {
                newQuantity = basketProduct.quantity + chosenProduct.quantity;
                basketProduct.quantity = newQuantity;
            } else { 
                basket.products.push(chosenProduct);
            }
        }   
        let lineBasket = JSON.stringify(basket);
        localStorage.setItem("basket", lineBasket); 
        */
    }
});