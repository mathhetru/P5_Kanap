var requestURL = "http://localhost:3000/api/products"

var request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();
request.onload = function (){
    var allCouch = request.response;
    showCouchs(allCouch);
}

// AFFICHAGE DES PRODUITS

function showCouchs(productsSheet) {
    for (var i = 0; i < productsSheet.length; i++){
        var product = productsSheet[i];        
        let allPanels = document.querySelector('.items');

        var createLinkPanel = document.createElement('a');
        createLinkPanel.setAttribute('href', "./product.html?id=" + product._id);
        allPanels.appendChild(createLinkPanel);

        var createArticle = document.createElement('article');
        createLinkPanel.appendChild(createArticle);

        var createPict = document.createElement('img');
        createPict.setAttribute('src', product.imageUrl);
        createPict.setAttribute('alt', product.altTxt);
        createArticle.appendChild(createPict);
    
        var createH3 = document.createElement('h3');
        createH3.className = 'productName';
        createH3.textContent = product.name;
        createArticle.appendChild(createH3);

        var createP = document.createElement('P');
        createP.className = 'productDescription';
        createP.textContent = product.description;
        createArticle.appendChild(createP);
    
    }
}
