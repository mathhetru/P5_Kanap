//Récupération du numéro de commande dans l'URL
var str = window.location.href;
var url = new URL(str);
var idOrderURL = url.searchParams.get("orderId");

//Affichage du numéro de commande
var orderIdNumberElt = document.querySelector('#orderId');
orderIdNumberElt.innerHTML = idOrderURL;