/**
 * Created by henri on 2017-08-08.hlkhlh
 */
var checkOrderStatusPoll
$(document).ready(function () {
    checkOrderStatusPoll = setInterval(checkOrderStatus, 5000);
    $(".cartRemoveBtn").hide();
    changeDateTime();
});
$(window).on("load", function() {
    getDeliveryUser();
    checkOrderStatus();
  //  getCartFromFile();
    checkOrderId();
});

var orderCreationTime;
var orderStatus;
var orderEstimatedDelivery;
var hour;
var minute;
var second;
var dateNow;
var estHour;
var estMinute;
var orderId;

var deliveryFee;
var freeDelivery;
var firstName;
var lastName;
var email;
var street;
var postCode;
var city;
var apNr = "";
var floor = "";
var doorCode = "";
var otherInfo = "";
var phoneNumber;

var orderRestaurantId;
var restaurantName;
var restaurantPhoneNumber;
var orderNr;
var orderPrice;

var deliveryWay;
var paymentWay = "Kort";
var receipt = "Klicka här";

function checkOrderId(){

if(sessionStorage.getItem('orderId') == null)   {
    orderId = sessionStorage.getItem("newOrder");
 }
    else{
         orderId = sessionStorage.getItem('orderId');
 }
}

function timeDelivery(time1) {
    if(time1 != null) {
        var newTime1 = time1 * 1000; // this converts the timestamp from the database to local time.
        dateNow = Date.now(); // dateNow.getTime() current time zone ?
        if(dateNow < newTime1){

            var difference = (newTime1 - dateNow);
            var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
            difference -= daysDifference * 1000 * 60 * 60 * 24;

            var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
            difference -= hoursDifference * 1000 * 60 * 60;

            var minutesDifference = Math.floor(difference / 1000 / 60);
            difference -= minutesDifference * 1000 * 60;

            var secondsDifference = Math.floor(difference / 1000);

            hour = hoursDifference;
            minute = minutesDifference;
            second = secondsDifference

            var hourConverted = hour * 60;
            minute = minute + hourConverted;

            hour = 0;
        }
       else if(dateNow > newTime1){ // if the clock passes the estimated delivery time should there be a next that says order ready or order delayed ?

            hour     = 0;
            minute   = 1;
            second   = 0;

        }


 }

}

function startClock(){
        document.getElementById("gifDiv").innerHTML =
            "<div class='clockTimes'>" +
             /*   "<div class = timerDivs id='timerDivs'>" +
                     "<div class='timeText'>" + "Hours" + "</div>" +
                     "<div class = 'clockDivs'>" +
                     "<span class='hours clockFonts'>"  + "</span>" +
                     "</div>" +
                "</div>" + */
                "<div class='timerDivs'>" +
                    "<div class='timeText'>" + "Minuter" + "</div>" +
                    "<div class ='clockDivs'>" +
                    "<span class='minutes clockFonts'>" + "</span>" +
                    "</div>" +
                "</div>" +
                "<div class='timerDivs'>" +
                    "<div class='timeText'>" + "Sekunder" +  "</div>" +
                    "<div class ='clockDivs'>" +
                    "<span class='seconds clockFonts'>" + "</span>" +
                    "</div>" +
                "</div>" +
            "</div>" ;

        var clock = document.getElementById("gifDiv");
     //   var hoursSpan = clock.querySelector('.hours');
        var minuteSpan = clock.querySelector('.minutes');
        var secondSpan = clock.querySelector('.seconds');

        function updateClock(){
            timeDelivery(orderEstimatedDelivery);

         //   hoursSpan.innerHTML = hour;
            minuteSpan.innerHTML = minute;
            secondSpan.innerHTML = second;

            if(hour == 0){
                $("#timerDivsHour").hide();
            }
             if(hour < 10){
             //  hoursSpan.innerHTML = "0" + hour;
            }
             if (minute <  10){
                minuteSpan.innerHTML = "0" + minute;
            }
             if(second < 10){
                secondSpan.innerHTML = "0" + second;
            }
             if(hour + minute + second < 1){
                clearInterval(timeInterval);
                clearInterval(checkOrderStatusPoll);
                minuteSpan.innerHTML = "01"; }
        }
            updateClock();
            var timeInterval = setInterval(updateClock, 1000);
    }

function changeDateTime(StrDateTime){

  //  var strDateTime = "2017-08-22 14:41:50 GMT"; // måste lägga till strängen GMT i slutet av tiden för att denna ska fugnera
    var localTime = StrDateTime + " " + "GMT"
    var currentDate = new Date(localTime);

        orderCreationTime = currentDate.toLocaleString();

}

function checkOrderStatus() {

    checkOrderId();
    var userId;
    var remember = localStorage.getItem("remember");
    if(remember === "true"){
        userId = localStorage.getItem("user");
    }
    else{
        userId = sessionStorage.getItem("user");
    }
    var error = function(result) {

        loadingOff();
        check401(result);

    };
    var successOrder = function(result){
        check401(result);
        if(result){
            orderNr = result[0].id;
            orderStatus = result[0].status;
            orderEstimatedDelivery = result[0].estimated_delivery;

            if(parseInt(orderStatus) == 0){
              //document.getElementById('countdownGif1').src = "img/loadingLoop.gif";
                document.getElementById("orderCDEstimatedDelivery").innerHTML = orderEstimatedDelivery;
            }
            else if(parseInt(orderStatus) > 0){
                //setInterval(timeDelivery(orderEstimatedDelivery), 1000);
                if(orderEstimatedDelivery != null || orderEstimatedDelivery!= undefined){
                    timeDelivery(orderEstimatedDelivery);
                    timeTilFinishedOrder(orderEstimatedDelivery);
                    startClock();
                    clearInterval(checkOrderStatusPoll);
                }else(
                    console.dir("Estimated delivery time was not set but the order was been responded")
                )
            }
            else if(parseInt(orderStatus) == 6 || parseInt(orderStatus) < 0){
                clearInterval(checkOrderStatusPoll);

            }
            else {

            }
        }
    };
    _get(usersEndpoint + "/" + userId + ordersEndpoint + "/" + orderId, successOrder, error, sessionKey);
}

function timeTilFinishedOrder(estimatedDelTime){
    if(estimatedDelTime !== null || estimatedDelTime !== undefined){
        estimatedDelTime *= 1000
        d = new Date(estimatedDelTime);
        estHour = d.getHours();
        estMinute = d.getMinutes();
        if(estMinute < 10){
            estMinute = "0" + estMinute;
        }
    } else {
        estHour = "";
        estMinute = "";
    }


}

function getDeliveryUser(){
    loadingOn();
    checkOrderId();
    var userId;
    var remember = localStorage.getItem("remember");
    if(remember === "true"){
        userId = localStorage.getItem("user");
    }
    else{
        userId = sessionStorage.getItem("user");
    }

    var error = function(result) {
        loadingOff();
        check401(result);

    };

    var successSite = function (result) {
        check401(result);
        deliveryFee = result.delivery_fee;
        freeDelivery = result.free_delivery;
        var estimatedDeliveryTime;
        var fullName = firstName + " " + lastName;
        var deliveryAddress = street + ", " + postCode + " " +city;
        restaurantName = result.name;
        if(estHour === null || estHour === undefined){
            estHour = "";
            estMinute = "";
            estimatedDeliveryTime = estHour + estMinute;
        }else {
                estimatedDeliveryTime = estHour + ":" + estMinute;
        }
        document.getElementById("orderCDEstimatedDelivery").innerHTML = estimatedDeliveryTime;
        document.getElementById("orderCDRestaurantName").innerHTML = restaurantName;
        //document.getElementById("orderCDRestaurantPhoneNumber").innerHTML = restaurantPhoneNumber;
        document.getElementById("orderCDOrderNr").innerHTML = orderNr;
        document.getElementById("orderCDName").innerHTML = fullName;
        document.getElementById("orderCDEmail").innerHTML = email;
        //document.getElementById("orderCDDeliveryWay").innerHTML = deliveryWay;
        //document.getElementById("orderCDDeliveryAddress").innerHTML = deliveryAddress;
        document.getElementById("orderCDPhoneNumber").innerHTML = phoneNumber;
        //document.getElementById("orderCDPaymentWay").innerHTML = paymentWay;
        document.getElementById("orderCDOrderCreationTime").innerHTML = orderCreationTime;
        loadingOff();
    };


    var successUser = function(result) {
        check401(result);
        if(result){
            firstName = result.first_name;
            lastName = result.last_name;
            email = result.email;
            phoneNumber = result.phonenumber;
            street = result.address.street;
            postCode = result.address.area_code;
            city = result.address.city;
            //restaurantName = result.;
            _get(sitesEndpoint + "/"+orderRestaurantId, successSite, error, sessionKey); //get site info
        }
    };
    var successOrder = function(result){
        check401(result);
        if(result){
            orderRestaurantId = result[0].site_id;
            orderPrice = result[0].totalPrice;
            orderCreationTime = result[0].creation_time;
            changeDateTime(orderCreationTime);

            if(result[0].delivery_type == "DELIVER"){
                document.getElementById("orderCDDeliveryWay").innerHTML = "Utkörning";
            } else if (result[0].delivery_type == "PICKUP"){
                document.getElementById("orderCDDeliveryWay").innerHTML = "Avhämtning";
            }


            var totalPrice = 0;

            //document.getElementById("orderCDEmail").innerHTML = result[0].;
            document.getElementById("orderCDDeliveryAddress").innerHTML = result[0].street + " " + result[0].city;
            document.getElementById("orderCDPhoneNumber").innerHTML = result[0].phonenumber;

            document.getElementById("sitemenuBill").innerHTML = "";
            for(var i = 0; i < result[0].orderLines.length; i++){
                var product = result[0].orderLines[i];
                var productName = product.productName;
                var quantity = product.quantity;
                var price = product.price;
                totalPrice = totalPrice + parseInt(price);
                document.getElementById("sitemenuBill").innerHTML +=
                    "<li class='productRow'>" +
                    "<div class='productItem'>"+
                    "<div class='col25'>"+quantity+"</div>" +
                    "<div class='col50 modName'>" + productName + "</div>" +
                    "<div class='col25'>" + price + "</div>" +
                    "</div>" +
                    "<ul class='modifiersList' id='modifiersList"+i+"'></ul>"+
                    "</li>";

                var modifiers = result[0].orderLines[i].modifiers;
                if(modifiers != null && modifiers.length != 0){
                    for(var x = 0; x < modifiers.length; x++){
                        var modifier = result[0].orderLines[i].modifiers[x];
                        var modifierId = modifier.product_id;
                        var modifierName = modifier.productName;
                        var modifierQuantity = modifier.quantity;
                        var modifierPrice = modifier.price;
                        totalPrice = totalPrice + parseInt(modifierPrice);
                        document.getElementById("modifiersList"+i).innerHTML +=
                            "<li class='modifierRow' >" +
                            "<div class='col25 modPlus'>+</div>" +
                            "<div class='col50 modName'>" + modifierName + "</div>" +
                            "<div class='col25'>" + modifierPrice + "</div>" +
                            "</li>";
                    }
                }
            }

            document.getElementById("totalSum").innerHTML = "BETALT: "+totalPrice.toString()+" kr";

            _get(usersEndpoint + "/"+userId, successUser, error, sessionKey); //get user info
        }
    };
    _get(usersEndpoint + "/" + userId + ordersEndpoint + "/" + orderId, successOrder, error, sessionKey);

}

function checkTotalprice(){
    if(deliveryFee > totalPrice){
        document.getElementById('utkorning').innerHTML = "Utkörning";
        document.getElementById('25kr').innerHTML = "25 kr";
    }else if(deliveryFee < totalPrice){
        document.getElementById('utkorning').innerHTML ="";
        document.getElementById('25kr').innerHTML ="";
    }
}


















