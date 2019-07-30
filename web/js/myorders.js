$(document).ready(function() {
    loadingOn();
    $('#buttonReadMore').on('click', function(event) {
        $('.bottomContainer').fadeToggle('show').css("display", "inline-flex");


    });
    getAllOrders();
    getFavorite();
    //orderOfFavorites();
    if(sessionStorage.getItem("loggedIn") == "true" || getCookie("loggedIn") == "true"){
        sessionStorage.setItem("selectedPage", "2");
        whatMenuCookie();
    }
});

var oneRowId;
var orderStatus;


function getAllOrders (){
    loadingOn();
    var remember = localStorage.getItem("remember");
    var userId;
    var orderInfo;
    if(remember === "true"){
        userId = localStorage.getItem("user");
    }
    else{
        userId = sessionStorage.getItem("user");
    }

    var success = function(result) {
        check401(result);
        for(var i = result.length - 1; i >= 0; i--) {

            if(result[i].status < 5){  // ordern ska vara visas om statusen är == 5 vilket betyder att den då är arkiverad.

                oneRowId = "oneRow" + i;

                if(result[i].status < 4){
                    orderInfo = "VISA ORDER";
                } else {
                    orderInfo = "LÄS MER";
                }
                var timestamp = result[i].creationTime;
                var orderDate = new Date(timestamp*1000);
                document.getElementById("contentOfListFromJs").innerHTML +=
                "<li class='myordersRow' id='" + oneRowId + "' tabindex='"+i+"'>" +
                "<p class='contentElement col25' id='date" + i + "'>" + orderDate.getFullYear()+"-"+(orderDate.getMonth()+1)+"-"+orderDate.getDate()+ "</p>" +
                "<p class='contentElement col20' id='restaurant" + i + "'>" + result[i].siteName + "</p>" +
                "<p class='contentElement col20' id='orderNumber" + i + "'>" + result[i].id + "</p>" +
                "<p class='contentElement col10' id='summary" + i + "'>" + result[i].price + "</p>" +
                "<button class='btnShowOrder col20 resizeFontSize' id='buttonReadMore' onclick='showReceipt(" + JSON.stringify(result[i]) + ",\"" + i + "\")'>" + orderInfo + "</button>" +
                "</li>" +
                "<div class='bottomContainer'id='bottomContainer" + i + "'>" +
                "<div class='col20' id='first'>" +
                "<p id='restaurantName'>" + result[i].siteName + "</p>" +
                "<br>" +
                "<a id='favorite' onclick='addToFavorite(\"" + result[i].siteName + "\",\"" + result[i].siteId + "\")'>Lägg till favorit</a>" +
                "<br>" +
                "<a class='showMenuTxtButton myOrderMenuTxtBtn'href='../web/sitemenu.php' onclick='redirectToRestaurant(\"" + result[i].siteId + "\")'>Visa meny</a>" +
                "<br>" +
                "<a id='receiptTxtButton'>KVITTO</a>" +
                "</div>" +
                "<div class='col30' id='second'>" +
                "<p id='receiptDate'>" + result[i].creationTime + "</p>" +
                "<br>" +
                "<p id='receiptOrderNumber'>Ordernummer: " + result[i].id + "</p>" +
                "<br>" +
                "<p id='receiptDelivery'>Leveranssätt: *Utkörning</p>" +
                "<br>" +
                "<p id='receiptPayment'>Betasätt: *Kontant </p>" +
                "</div>" +
                "<div class=' col50' id='third'>" +
                "<table id='receiptTable'>" +
                "<thead>" +
                "<tr>" +
                "<th>Beställning:</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<thead>" +
                "<tbody id='containerReceipt" + i + "'>" +

                "</tbody>" +
                "</thead>" +

                "<tr class='totalBorderContainer'>" +
                "<td class='totalBorder'>Totalt varav moms: 25%</td>" +
                "<td class='totalBorder'>" + result[i].price + " kr</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>" +
                "</div>" +
                "</div>";

        }
    }
         loadingOff();
     };
     var error = function(result) {
         check401(result);

         //console.log(error.responseText);
         loadingOff();
     };

     _get(usersEndpoint + "/"+userId + ordersEndpoint, success, error, sessionKey);
 }


 function getFavorite() {

     var remember = localStorage.getItem("remember");
     var userId;
     if(remember === "true"){
         userId = localStorage.getItem("user");
     }
     else{
         userId = sessionStorage.getItem("user");
     }
     //  if(!favoriteArray.includes(name)){
     // favoriteArray.push(name);
     var success = function (result) {
         check401(result);

             for (var i = 0; i < result.length; i++) {

                 var logoUrl = result[i].customLogo;
                 var logo = 'img/Matsugen_symbol_Gray.png';
                 if(logoUrl != null || logoUrl != undefined){
                     logo = "../static/logos/"+logoUrl;
                 }
                 

                 document.getElementById("rightSideDiv").innerHTML +=
                  "<div class='rightSideObj' id='favoriteRest'>" +
                  "<div class='contentOfRightSideDiv' id='contentRightSideDivFav'>" +
                  "<img class='col25 logoImageRightSide' onerror='imageError(this)' src='"+ logo +"' id='logoImageRightSide"+i+"'>" +
                  "<div class='contentOfMiddleDiv col50'>" +
                  "<p id='rightSideRestaurant'>" + result[i].name + "</p>" +
                  "<p id='rightSideAddress'>"+result[i].address.street+ " " +result[i].address.streetNumber + "</p>" +
                  "<p id='rightSidePrice'>Minsta beställningen *150kr</p>" +
                  "</div>" +
                  "<div>" +
                  "<p id='ratingRightSide'> ***** </p>" +
                  "<a class='resultsMenuLink' href='../web/sitemenu.php' onclick='redirectToRestaurant(\""+result[i].id+ "\")'>Visa meny</a>" + "<br>"+
                  "<a class='txt11 removeFavourite' onclick='eraseFromFavorite(\""+result[i].name+ "\",\""+result[i].id+ "\")'>Ta bort favorit</a>" +
                  "</div>" +
                  "</div>" +
                  "<div class='contentOfRightSideDivBottom'>" +
                  "<div id='inner'>" +
                      "<div class='resultsObjOpenTime'>" +
                          "<div>" +
                              "<p>Avhämtning: </p>" +
                              "<p class='resultsStatus' id='resultsStatus"+result[i].id+"'></p>" +
                          "</div>" +
                          "<div>" +
                              "<p>Utkörning: </p>" +
                              "<p class='resultsDeliveryClosing' id='resultsDeliveryClosing"+result[i].id+"'></p>" +
                          "</div>" +
                      "</div>" +
                  "</div>" +
                  "</div>" +
                  "</div>";

                 getSiteBusinessHours(result[i].id);

             }


         };

         var error = function (result) {
             check401(result);

             //console.log(error.responseText);
         };
     _get(usersEndpoint + "/" + userId + favouritesEndpoint, success, error, sessionKey);
 }


 function showReceipt(result ,i) {
     //alert(i);
     //alert(result);
     focusThis(i);
     if(result){
        if(parseInt(result.status) < 4) {
            sessionStorage.setItem('orderId', result.id);

            window.location.replace("../web/orderCD.php");
        } else{
            document.getElementById("containerReceipt" + i).innerHTML = " ";
            for (var k = 0; k < result.orderLines.length; k++) {
                if (result.orderLines[k].quantity != 1) {
                    document.getElementById("containerReceipt" + i).innerHTML +=
                        "<tr id='oneLiner'" + k + ">" +
                        "<td id='receiptName'" + k + ">" + result.orderLines[k].productName + "</td>" +
                        "<td id='receiptPrice'" + k + ">" + result.orderLines[k].price + "kr " + " x " + result.orderLines[k].quantity + "st " + "</td>" +
                        "</tr>";
                }
                else {
                    document.getElementById("containerReceipt" + i).innerHTML +=
                        "<tr id='oneLiner'" + k + ">" +
                        "<td id='receiptName'" + k + ">" + result.orderLines[k].productName + "</td>" +
                        "<td id='receiptPrice'" + k + ">" + result.orderLines[k].price + "kr" + "</td>" +
                        "</tr>";
                }
                if (result.orderLines[k].modifiers != null) {
                    for (var j = 0; j < result.orderLines[k].modifiers.length; j++) {

                        if (result.orderLines[k].modifiers[j].quantity != 1) {
                            document.getElementById("containerReceipt" + i).innerHTML +=
                                "<td> + " + result.orderLines[k].modifiers[j].productName +
                                "<td id='priceAndQuantity'>" + result.orderLines[k].modifiers[j].price + "kr " + " x " + result.orderLines[k].modifiers[j].quantity + "st " + "</td>" +
                                "</td>";
                        }
                        else {
                            document.getElementById("containerReceipt" + i).innerHTML +=
                                "<td> + " + result.orderLines[k].modifiers[j].productName +
                                "<td id='priceAndQuantity'>" + result.orderLines[k].modifiers[j].price + "kr" + "</td>" +
                                "</td>";
                        }

                    }
                }
        }
    }

}
     $('.bottomContainer').stop(true, true).fadeOut(500).css("display", "none");
     //$('#bottomContainer'+i).stop(true, true).fadeIn(1000).css("display", "inline-flex");

     document.getElementById("bottomContainer"+i).style.display = 'inline-flex';

     //window.location.hash = '#menuLogoHead' + '#oneRow'+i + '#bottomContainer'+i;



}
function focusThis(i) {
    document.getElementById("oneRow"+ i).scrollIntoView();
    document.getElementById("bottomContainer"+ i).scrollIntoView();

    bottomContainer0
        //$('li[tabindex='+i+']').scrollIntoView();
        //$('#bottomContainer'+i).scrollIntoView();


}