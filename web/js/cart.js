$(document).ready(function() {
 //   setTimeout(addDeliveryFee, 1000);
});


var minOrder;
var freeDelivery;
var deliveryFee;


function getRestInfo(callback){
    var restaurantId = sessionStorage.getItem("restaurantId");
    var success = function (result) {
        check401(result);
        document.getElementById("demandsDiv").innerHTML =

            "<p id='minOrder' class=''>" + 'Minsta beställningen: '+ result.min_delivery_amount+'kr' + "</p>" +
            "<p id='deliveryCost' class=''>" + 'Utkörning: '+result.delivery_fee +'kr' + "</p>" +
            "<p id='freeDelivery' class='' >" + '(0 kr vid beställning över:' +result.free_delivery+ 'kr)'+ "</p>";
        document.getElementById("sitemenuDeliveryCost").innerHTML =
            "<div class='sitemenuRightSideDivTableBodyBottom'>"+
                "<div class='col15'></div>"+
                "<div class='col50'>"+'Utkörning'+"</div>"+
                "<div class='col25'>"+result.delivery_fee +'kr'+"</div>"+
                "<div class='col10'></div>"+
            "</div>";

        deliveryFee = result.delivery_fee;
        minOrder = result.min_delivery_amount;
        freeDelivery = result.free_delivery;
        callback();

    };
    var error = function (result) {
        console.log("Something went wrong with the connection");
        check401(result);
        loadingOff();
    };

    _get(sitesEndpoint + "/"+restaurantId , success, error, sessionKey);


}

var currentlyModdingProduct;
function makeProduct(productName, productPrice, productId, modify) {
    var obj = {};
    obj["product_id"] = productId;
    obj["product_name"] = productName;
    obj["quantity"] = 1;
    obj["price"] = priceSum(productPrice, 1);
    obj["modifiers"] = [];
    if(modify == "true"){
        currentlyModdingProduct = obj;
    } else{

        addToCart(obj)
    }
}

var currentModifiers = [];
function makeModifier(productName, productPrice, productId){
    var modifierObj = {};
    modifierObj["product_id"] = productId;
    modifierObj["product_name"] = productName;
    modifierObj["quantity"] = 1;
    modifierObj["price"] = priceSum(productPrice, 1);
    currentModifiers.push(modifierObj);
}

function modifierCheckBox(cb, productName, productPrice, productId) {
    if(cb.checked){
        makeModifier(productName, productPrice, productId);
    } else{
        for(var i = 0; i < currentModifiers.length; i++){
            if(currentModifiers[i].product_id == productId){
                currentModifiers.splice(i, 1);
            }
        }
    }

}

function addModifiedProductToCart(productId) {
    currentlyModdingProduct.modifiers = currentModifiers;
    addToCart(currentlyModdingProduct);
    currentlyModdingProduct = null;
    closeModifiersPopUp(productId);
}

function checkIfInCart(cartArray, product) {

    for(var i = 0; i < cartArray.length; i++){

        if(cartArray[i].product_id == product.product_id){
            var mods = cartArray[i].modifiers;
            var prodMods = product.modifiers;
            if(mods != null && prodMods != null && (mods.length == prodMods.length)){
                if(mods.length > 0 && prodMods.length > 0){
                    var modsEqual = 0;
                    for(var x = 0; x < mods.length; x++){
                        var mod = mods[x];
                        for(var y = 0; y < prodMods.length; y++){
                            var prodMod = prodMods[y];

                            if(mod.product_id == prodMod.product_id){
                                modsEqual++;
                                if(x == (mods.length-1) && modsEqual == mods.length){
                                    return i;
                                }
                                break;
                            }
                        }
                    }
                } else if(mods.length == 0 && prodMods.length == 0){
                    return i;
                }
            } else if(mods == null && prodMods == null){
                return i;
            }
        }
    }
    return -1;
}

function addToCart(product){
    var cartArray = JSON.parse(localStorage.getItem("cart"));


    if(cartArray == null || cartArray.length == 0){
        cartArray = [];
        cartArray.push(product);
    }
    else if(cartArray != null && cartArray.length > 0){
        var exists = false;
        var existsIndex = checkIfInCart(cartArray, product);
        if(existsIndex != -1){
            exists = true;
        }
        if(exists){

            var quantity = parseInt(cartArray[existsIndex].quantity);
            quantity = quantity + 1;
            cartArray[existsIndex].quantity = quantity;
            cartArray[existsIndex].price = priceSum(product.price, quantity);
        } else if(!exists){
            cartArray.push(product);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartArray));
    getCartFromFile();
}

function addDeliveryFee() {
    //var delivery = document.getElementById("sitemenuDelivery").checked;
    //var pickup = document.getElementById("sitemenuPickUp").checked;
    var deliveryStatus = sessionStorage.getItem("checkBox");
    var deliveryCost = $('#sitemenuDeliveryCost');
        if(deliveryStatus == 0){
            if(productsPrice >= freeDelivery){
                deliveryCost.stop(true, true).fadeOut(500);
                totalPrice = productsPrice;
            } else if(productsPrice < freeDelivery){
                deliveryCost.stop(true, true).fadeIn(500);
                totalPrice = productsPrice + deliveryFee;
            }
        }
        if(deliveryStatus == 1){
            totalPrice = productsPrice;
        }
    try{
        document.getElementById("totalSum").innerHTML = "ATT BETALA: "+totalPrice.toString()+" kr";
    } catch(e){
    }
}

var productsPrice;
var totalPrice;

function getCartFromFile(){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    document.getElementById("sitemenuBill").innerHTML = "";
    totalPrice = 0;
    if(cartArray != null && cartArray.length != 0){
        for(var i = 0; i < cartArray.length; i++){
            var product = cartArray[i];
            var productId = product.product_id;
            var productName = product.product_name;
            var quantity = product.quantity;
            var price = product.price;
            totalPrice = totalPrice + price;
            var prodObj = JSON.stringify(product);
            document.getElementById("sitemenuBill").innerHTML +=
                "<li class='productRow'>" +
                    "<div class='productItem'>"+
                        "<div class='col15'>"+quantity+"</div>" +
                        "<div class='col50 modName'>" + productName + "</div>" +
                        "<div class='col25'>" + price + "</div>" +
                        "<div class='col10'><p class='cartRemoveBtn' onclick='removeFromCart("+prodObj+")'>-</p></div>" +
                    "</div>" +
                    "<ul class='modifiersList' id='modifiersList"+i+"'></ul>"+
                "</li>";
            var modifiers = cartArray[i].modifiers;
            if(modifiers != null && modifiers.length != 0){
                for(var x = 0; x < modifiers.length; x++){
                    var modifier = cartArray[i].modifiers[x];
                    var modifierId = modifier.product_id;
                    var modifierName = modifier.product_name;
                    var modifierQuantity = modifier.quantity;
                    var modifierPrice = modifier.price;
                    totalPrice = totalPrice + modifierPrice;
                    document.getElementById("modifiersList"+i).innerHTML +=
                        "<li class='modifierRow' >" +
                        "<div class='col15 modPlus'>+</div>" +
                        "<div class='col50 modName'>" + modifierName + "</div>" +
                        "<div class='col25'>" + modifierPrice + "</div>" +
                        "<div class='col10'></div>" +
                        "</li>";
                }
            }
        }

    }
    productsPrice = totalPrice;
    addDeliveryFee();
   // document.getElementById("totalSum").innerHTML = "ATT BETALA: "+totalPrice.toString()+" kr";
    document.getElementById("tax").innerHTML = "Varav Moms : 25%;"//"Varav Moms: "+(Math.ceil(totalPrice*0.12)).toString()+" kr";
    return{
        'totalPrice' : totalPrice
    };

}

function removeFromCart(product){
    var cartArray = JSON.parse(localStorage.getItem("cart"));
    var prodObj = JSON.stringify(product);
    if(cartArray != null && cartArray.length > 0){
        if(cartArray != null && cartArray.length > 0){
            var exists = false;
            var existsIndex = checkIfInCart(cartArray, JSON.parse(prodObj));
            if(existsIndex != -1){
                exists = true;
            }
            if(exists){
                var quantity = parseInt(cartArray[existsIndex].quantity);
                if(quantity == 1){
                    cartArray.splice(existsIndex, 1);
                } else if(quantity > 1){
                    var price = (cartArray[existsIndex].price/quantity);
                    quantity = quantity - 1;
                    cartArray[existsIndex].quantity = quantity;
                    cartArray[existsIndex].price = priceSum(price, quantity);
                }
            }
        }
    }

    localStorage.setItem("cart", JSON.stringify(cartArray));
    getCartFromFile();
}

function priceSum(price, quantity){
    return parseFloat((price*quantity).toFixed(2));
}


function placeOrder(){
    var loggedIn = sessionStorage.getItem("loggedIn");
    var loggedInLocal = localStorage.getItem("remember");
    if(loggedIn == "true" || loggedInLocal == "true"){
        addDeliveryFee();
        var street = document.getElementById("myPageAddress").value;
        var areaCode = document.getElementById("myPagePostCode").value;
        var city = document.getElementById("myPageCity").value;
        var phoneNumber = document.getElementById("myPagePhoneNumber").value;
        var firstName = document.getElementById("myPageFirstName").value;
        var surName = document.getElementById("myPageSurName").value;
        var otherInfo = document.getElementById("myPageOtherInfo").value;
        var apartment = document.getElementById("myPageApNr").value;
        var floor = document.getElementById("myPageFloor").value;
        var accessCode = document.getElementById("myPageDoorCode").value;
        var cartArray = JSON.parse(localStorage.getItem("cart"));
        var deliveryCheck = document.getElementById("sitemenuDelivery").checked;

        if(deliveryCheck == true) {
            if (totalPrice < minOrder) {
                alert("Du måste beställa för minst " + minOrder + " för att få ordern utkörd!");
            }
            else {
                if (cartArray != null && cartArray.length > 0) {
                    if (sessionStorage.getItem("readyToOrder") === "false") {
                        //alert("readytoorder FALSE");
                        window.location = "../web/payment.php";
                    }
                    else if (sessionStorage.getItem("readyToOrder") === "true") {
                        var checkButtonAccept = document.getElementById("paymentCheckboxAccept").checked;
                        if(checkButtonAccept == true){
                            loadingOn();
                            var userId;
                            if (localStorage.getItem("remember") === "true") {
                                userId = localStorage.getItem("user");
                            }
                            else {
                                userId = sessionStorage.getItem("user");
                            }
                            var restaurantId = sessionStorage.getItem("restaurantId");

                            var data = {
                                "customer_id": userId,
                                "site_id": restaurantId,
                                "reservation_id": null,                                                         // reservation id behövs inte i framtiden. den kommer behövas tas bort.
                                "payment_token": "dsfw4534rfgrhuh387587rbncq4757v478gf QR723474T7BRWET5",
                                "delivery_address": {
                                    "street": street,
                                    "area_code": areaCode,
                                    "city": city,
                                    "country": "SE",
                                    "phonenumber": phoneNumber,
                                    "first_name": firstName,
                                    "last_name": surName
                                },
                                "order_lines": cartArray,
                                "other_info": otherInfo
                            };

                            var success = function (result) {
                                check401(result);
                                sessionStorage.removeItem("readyToOrder");
                                sessionStorage.setItem("newOrder", result);
                                sessionStorage.removeItem('orderId');

                                cartArray = [];
                                window.location.replace("../web/orderCD.php");

                                //alert(totalPrice);
                                loadingOff();
                            };
                            var error = function (result) {
                                check401(result);
                                console.log(error.responseText);
                                loadingOff();
                            };
                            _post(sitesEndpoint + "/" + restaurantId + ordersEndpoint, success, error, JSON.stringify(data), sessionKey);
                        } else {
                            //alert("Du måste godkänna villkoren innan du kan lägga en beställning");

                            document.getElementById("checkboxAccept").style.color = "red";
                            document.getElementById("checkboxAccept").scrollIntoView();
                        }
                    }
                }
                else {
                    alert("Din varukorg är tom. Var snäll och lägg till varor innan går vidare!")
                }
            }
        } else if(deliveryCheck == false){
            if (cartArray != null && cartArray.length > 0) {
                if (sessionStorage.getItem("readyToOrder") === "false") {
                    //alert("readytoorder FALSE");
                    window.location = "../web/payment.php";
                }
                else if (sessionStorage.getItem("readyToOrder") === "true") {

                    var checkButtonAccept = document.getElementById("paymentCheckboxAccept").checked;
                    if(checkButtonAccept == true){
                        //alert("din order kommer finnas för upphämtning");

                        //alert("readytoorder TRUE");
                        loadingOn();
                        var userId;
                        if (localStorage.getItem("remember") === "true") {
                            userId = localStorage.getItem("user");
                        }
                        else {
                            userId = sessionStorage.getItem("user");
                        }
                        var restaurantId = sessionStorage.getItem("restaurantId");

                        var data = {
                            "customer_id": userId,
                            "site_id": restaurantId,
                            "delivery_id": null,
                            "reservation_id": null,
                            "payment_token": "dsfw4534rfgrhuh387587rbncq4757v478gf QR723474T7BRWET5",
                            "order_lines": cartArray
                        };
                        var success = function (result) {
                            //alert("SUCCESS MOFO");
                            sessionStorage.removeItem("readyToOrder");
                            sessionStorage.setItem("newOrder", result);
                            sessionStorage.removeItem('orderId');
                            cartArray = [];
                            window.location.replace("../web/orderCD.php");
                            loadingOff();
                        };
                        var error = function (result) {
                            check401(result);
                            console.log(error.responseText);
                            loadingOff();
                        };
                        _post(sitesEndpoint + "/" + restaurantId + ordersEndpoint, success, error, JSON.stringify(data), sessionKey);
                    } else {

                        document.getElementById("checkboxAccept").style.color = "red";
                        window.location.hash = '#checkboxAccept';
                    }
                }
            }
            else {
                alert("Din varukorg är tom. Var snäll och lägg till varor innan går vidare!")
            }
        }
    } else{
        $("#popUpWrap1").stop(true, true).fadeIn(500);
        $("#userName").focus();

    }
}

function clearThis(){
    $("#checkboxAccept").attr({style : ""});
}

/* -------------------Rest INFO------------*/



/*-----------------------------checkbox-------------------*/

function fillCheckBox(){
    var status  = sessionStorage.getItem("checkBox");   // sessionStorage "checkBox" is not removed anywhere now, in order to be able to back to a page it is stored, dont know whwere i´d remove it.
    if(status == 0){
        changeCheckBoxDeliveryPickUp(0);
    }
    else if(status == 1){
        changeCheckBoxDeliveryPickUp(1);
    }
}



function changeCheckBoxDeliveryPickUp(type) {
    var delivery = document.getElementById("sitemenuDelivery");
    var pickup = document.getElementById("sitemenuPickUp");

    if(type === 0){
        delivery.checked = true;
        delivery.parentNode.style.backgroundColor = "#DC4405";
        pickup.checked = false;
        pickup.parentNode.style.backgroundColor = "transparent";
        $(".sitemenuRightSideDivTableBodyBottom").stop(true, true).fadeIn(500);
    }
    else if(type === 1){
        delivery.checked = false;
        delivery.parentNode.style.backgroundColor = "transparent";
        pickup.checked = true;
        pickup.parentNode.style.backgroundColor = "#DC4405";
        $(".sitemenuRightSideDivTableBodyBottom").stop(true, true).fadeOut(500);
    }
}


function setCheckBoxType(type){
    if(type == 0){
        sessionStorage.setItem("checkBox", type);
        try{
            $('#myPageSecondBody').slideDown();
            $('#paymentCheckboxBody').slideDown();
            $('#adressTitle').slideDown();
        }catch(e){
            console.dir("unable to slidedown");
        }
    } else if(type == 1){
        sessionStorage.setItem("checkBox", type);
        try{
            $('#myPageSecondBody').slideUp();
            $('#paymentCheckboxBody').slideUp();
            $('#adressTitle').slideUp();
        }catch(e) {
            console.dir("unable to slideup");

        }
    }
}






