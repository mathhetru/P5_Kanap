// récupération du contenu du panier 
let basketStr = localStorage.getItem('basket');
var basket = JSON.parse(basketStr); 

// récupération de cart__items
var cartPanel = document.querySelector('#cart__items');

function showProductBasket(produit) {
    // AFFICHAGE DU/DES PRODUIT(S) PANIER
    // insertion des articles
    var createArticle = document.createElement('article');
    createArticle.className = 'cart__item';
    createArticle.setAttribute('data-id', produit.id);
    createArticle.setAttribute('data-color', produit.color);
    cartPanel.appendChild(createArticle);

    // insertion div de l'img
    var createDivIMG = document.createElement('div');
    createDivIMG.className = 'cart__item__img';
    createArticle.appendChild(createDivIMG);

    // insertion des images
    var createPict = document.createElement('img');
    createPict.setAttribute('src', produit.img);
    createPict.setAttribute('alt', "Photographie d'un canapé");
    createDivIMG.appendChild(createPict);

    // insertion div content description
    var createDivContDes = document.createElement('div');
    createDivContDes.className = 'cart__item__content';
    createArticle.appendChild(createDivContDes);

    // insertion div description
    var createDivDes = document.createElement('div');
    createDivDes.className = 'cart__item__content__description';
    createDivContDes.appendChild(createDivDes);

    // insertion H2
    var createH2 = document.createElement('h2');
    createH2.textContent = produit.name;
    createDivDes.appendChild(createH2);

    // insertion P color
    var createpColor = document.createElement('p');
    createpColor.textContent = "Couleur : " + produit.color;
    createDivDes.appendChild(createpColor);

    // insertion P price
    var createpPrice = document.createElement('p');
    createpPrice.textContent = "Prix : " + produit.price + " € / canapé";
    createDivDes.appendChild(createpPrice);

    // insertion div content settings
    var createDivContSet = document.createElement('div');
    createDivContSet.className = 'cart__item__content__settings';
    createDivContDes.appendChild(createDivContSet);

    // insertion div settings quantity
    var createDivContSetQuantity = document.createElement('div');
    createDivContSetQuantity.className = 'cart__item__content__settings__quantity';
    createDivContSet.appendChild(createDivContSetQuantity);

    // insertion P quantity
    var createpQuantity = document.createElement('p');
    createpQuantity.textContent = "Qté :";
    createDivContSetQuantity.appendChild(createpQuantity);

    // insertion input quantity
    var createInputQuantity = document.createElement('input');
    createInputQuantity.className = 'itemQuantity';
    createInputQuantity.setAttribute('type', 'number');
    createInputQuantity.setAttribute('name', 'itemQuantity');
    createInputQuantity.setAttribute('min', '0');
    createInputQuantity.setAttribute('max', '100');
    createInputQuantity.setAttribute('value', produit.quantity);
    createDivContSetQuantity.appendChild(createInputQuantity);

    // insertion div settings delete
    var createDivContSetDel = document.createElement('div');
    createDivContSetDel.className = 'cart__item__content__settings__delete';
    createDivContSet.appendChild(createDivContSetDel);

    // insertion P delete
    var createpDelete = document.createElement('p');
    createpDelete.className = 'deleteItem';
    createpDelete.textContent = "Supprimer";
    createDivContSetDel.appendChild(createpDelete);
}

// SI le panier est vide, afficher "panier vide" 
// SINON parse le panier, et utiliser la function showproductbasket 
if (basketStr == null) {
    var createpEmpty = document.createElement('p');
    createpEmpty.textContent = 'Votre panier est vide';
    cartPanel.appendChild(createpEmpty);
} else {   
    for (var i = 0 ; i < basket.products.length; i++) {
        basketProduct = basket.products[i];
        showProductBasket(basketProduct);
    }
    let totalQuantity = document.querySelector('#totalQuantity');
    let totalPrice = document.querySelector('#totalPrice');
    totalPrice.textContent = basket.totalPrice;
    totalQuantity.textContent = basket.totalQuantity;
}

// Changement quantité et prix
var quantityItem = document.querySelectorAll('.itemQuantity');

for (let k = 0; k < quantityItem.length; k++) { 
    quantityItemUnit = quantityItem[k];
    quantityItemUnit.addEventListener('change', function(event) {
        for (var l = 0 ; l < basket.products.length; l++) {
            basketProduct = basket.products[l];
            var articleQuantityItemID = event.target.closest('article').getAttribute("data-id");
            var articleQuantityItemColor = event.target.closest('article').getAttribute("data-color");
            newQuantityValue = event.target.valueAsNumber;
            
            if (basketProduct.id == articleQuantityItemID && basketProduct.color == articleQuantityItemColor) {
                qtyToAdd = newQuantityValue - basketProduct.quantity;
                basketProduct.quantity = newQuantityValue;
                basket.totalQuantity = basket.totalQuantity + qtyToAdd;

                priceToAdd = qtyToAdd * basketProduct.price;
                basket.totalPrice = priceToAdd + basket.totalPrice;

                let lineBasket = JSON.stringify(basket);
                localStorage.setItem("basket", lineBasket);
                window.location.reload();
            }
        }  
    })
};

// Suppression du/des canapé(s)
var delItem = document.querySelectorAll('.deleteItem');

for (let j = 0; j < delItem.length; j++) {
    delItemUnit = delItem[j];
    delItemUnit.addEventListener('click', function(event) {
        var articleDelItemID = event.target.closest('article').getAttribute("data-id");
        var articleDelItemColor = event.target.closest('article').getAttribute("data-color");
        
        var basket = JSON.parse(basketStr);   
        productToDel = basket.products.find(el => el.id == articleDelItemID && el.color == articleDelItemColor);
        
        result = basket.products.filter(el => el.id !== articleDelItemID || el.color !== articleDelItemColor);
        basket.products = result;

        newQuantity = basket.totalQuantity - productToDel.quantity;
        basket.totalQuantity = newQuantity;
        priceToDel = productToDel.quantity * productToDel.price;
        newPrice= basket.totalPrice - priceToDel; 
        basket.totalPrice = newPrice;
        
        let lineBasket = JSON.stringify(basket);
        localStorage.setItem("basket", lineBasket);
        window.location.reload()
    })
};
