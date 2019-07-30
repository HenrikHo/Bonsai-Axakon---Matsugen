
$(document).ready(function() {
    $('#ordersWrap').scroll(function() {
        scrollBottom();
    });
});

$(window).on("load", function () {
    alertUnreadMessage();


    // poll = setInterval(pollOrders,3000);

    pollOrders();
});
var index;
var setOfOrders = 20;
var hour;
var minute;
var second;
var orderCreationTime;
var arrayResult;
var varOrderId;
var varUserId;
var varOrderStatus;
var varOrderDeliveryType;
var audio = new Audio('audio/notification_sound.mp3');
var poll;
var carObj;
var newOrderList = [];
var newOrderListIds = [];

function getCarsForRest(callback){


   loadingOn();
    var id = localStorage.getItem("siteRTC");
    var sessionKey = localStorage.getItem("keyRTC");

    var success = function (result) {

        carObj ={
            "result":result
        };

        callback();

    };
    var error = function (result) {
        loadingOff();
    };
    _get(sitesEndpoint + "/" + id + vehiclesEndpoint, success, error, sessionKey); // FEL!

   loadingOff();
}

function pollOrders(){
    var order;
    var orderStatus;
    var orderId;
    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");

 
    var success = function (result){

        var popUpWrapNewOrder = document.getElementById("popUpWrapNewOrder");

        for(var y = 0; y < result.result.length; y++){
            order = result.result[y];
            orderStatus = order["status"];
            orderId = order["id"];
            if(orderStatus == 0){
                if(newOrderListIds.length == 0 || !newOrderListIds.includes(orderId)){
                    newOrderList.push(order);
                    newOrderListIds.push(orderId);
                    newOrderPopUp(order);
                }
            }
        }

    };

    var error = function (result){
        // loadingOff();
    };
    _get(sitesEndpoint + ordersEndpoint + "?page_size=0", success, error, key);
}
function scrollBottom (){

    var orderDiv = $('#ordersWrap');
    var bottom = orderDiv.prop('scrollHeight') - orderDiv.innerHeight();
    if (orderDiv.scrollTop() == bottom) {
        //getOrders();

    }
}

function getOrders(callback){

    loadingOn();
    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");

    var success = function (result) {

        var listStatus1 = [];
        for (var k = 0; k < result.result.length; k++){
            if(result.result[k].status == 1){
                listStatus1.push(result.result[k]);
            }
        }


        var ordersList = document.getElementById("ordersList");
            ordersList.innerHTML = "";
            getCarsForRest(function(){
                for(var j = 0; j < listStatus1.length; j++){
                    if(j > setOfOrders){
                        j = setOfOrders;
                        setOfOrders = setOfOrders + 20;
                        break;
                    }
                    varOrderDeliveryType = listStatus1[j]["delivery_type"];
                    varOrderId = listStatus1[j]["id"];
                    varUserId = listStatus1[j]["user_id"];
                    varOrderStatus = listStatus1[j]["status"];
                    arrayResult = listStatus1[j];
                    fillListOrders(j, arrayResult, varOrderId);
                }
            });
            loadingOff();
    };
    var error = function (result) {
       loadingOff();
    };
    _get(sitesEndpoint + ordersEndpoint + "?page_size=0", success, error, key);
    if(callback){
        callback();
    }
}



function fillListOrders(j, arrayResult, varOrderId) {



    //console.dir(varOrderId);
    var ordersList = document.getElementById("ordersList");
    if (varOrderStatus == 1) {
    if(varOrderDeliveryType == "DELIVER") {
            try{
                ordersList.innerHTML = ordersList.innerHTML +
                    "<li class='listObj' id='listObj" + j + "' value='" + varOrderId + "'>" +
                    "<div onclick='showRec(this.id, " + varUserId + ");' id='" + varOrderId + "' class='listObjDiv'>" +
                    "<p class='txt20 bold txtWhite'>" + varOrderId + "</p>" +
                    "<div class='orderObjInfo'>" +
                        "<div class='importantInfo'>"+
                    "<p class='listObjInfoAddress txt20 normal txtWhite'>"+ arrayResult.address.street + "</p>" +
                    "<p class='listObjInfoAddress txt20 normal txtWhite'>"+ arrayResult.name +"</p>" +
                        "</div>"+
                    "<p class='listObjInfoTime txt20 bold txtWhite' id='timeToFinish" + j + "'></p>" +
                    "</div>" +
                    "</div>" +

                    "<div class='listObjDivLev'>" +
                        "<div class='listObjCarsDiv orderCars' id='listObjCarsDiv" + j + "'>" +
                        "</div>" +
                    "</div>" +
                    "</li>";

            } catch (e){}
                for(var h = 0; h < carObj.result.length; h++){
                    if(carObj.result[h] != null){
                        document.getElementById("listObjCarsDiv"+j).innerHTML +=
                            "<div class='carBtnObj' id='carObj"+j+h+"'>"+
                            "<p class='txt16 normal txtWhite' id='car"+j+"' onclick='orderReady(\""+carObj.result[h].id+ "\",this,\""+carObj.result[h].site+ "\" )'>"+carObj.result[h].name+"</p>"+
                            "</div>";
                        timeCheck(j, h, arrayResult, varOrderId);
                    } else if(carObj.result[h] == null){}
                }
                }else if (varOrderDeliveryType == "PICKUP") {
                    try{
                        ordersList.innerHTML = ordersList.innerHTML +
                            "<li class='listObj' id='listObj" + j + "' value='" + varOrderId + "'>" +
                            "<div onclick='showRec(this.id, " + varUserId + ");' id='" + varOrderId + "'  class='listObjDiv'>" +
                            "<p class='txt20 bold txtWhite'>" + varOrderId + "</p>" +
                            "<div class='orderObjInfo'>" +
                            "<p class='listObjInfoAddress txt20 normal txtWhite'>"+ arrayResult.address.street +"</p>" +
                            "<p class='listObjInfoTime txt20 bold txtWhite' id='timeToFinish" + j + "'>*14:41</p>" +
                            "</div>" +
                            "</div>" +
                            "<div class='listObjDivLevDone'>" +
                            "<div class='listObjCarsDiv' id='pickupBtnDiv"+j+"'>" +
                                    "<div class='carBtnObjDone' value='1' onclick='pickupOrderReady(\""+varOrderId+ "\", 1, \"true\", this)' id='pickUpBtn"+j+"'>" +
                                            "<p class='txt20 normal txtWhite'>KLAR</p>" +
                                    "</div>" +
                            "</div>" +
                            "</div>" +
                            "</li>";
                    } catch (e){
                    } finally {
                        timeCheck(j, null, arrayResult, varOrderId);
                    }


           }

    }else if(varOrderStatus == 2){
        if(varOrderDeliveryType == "PICKUP"){
    try{
            ordersList.innerHTML = ordersList.innerHTML +
                "<li class='listObj' id='listObj" + j + "' value='" + varOrderId + "'>" +
                "<div onclick='showRec(this.id, " + varUserId + ");' id='" + varOrderId + "'  class='listObjDiv'>" +
                "<p class='txt20 bold txtWhite'>" + varOrderId + "</p>" +
                "<div class='orderObjInfo'>" +
                "<p class='listObjInfoAddress txt20 normal txtWhite'></p>" +
                "<p class='listObjInfoTime txt20 bold txtWhite' id='timeToFinish" + j + "'>*14:41</p>" +
                "</div>" +
                "</div>" +
                "<div class='listObjDivLevDone'>" +
                    "<div class='listObjCarsDiv' id='pickupBtnDiv"+j+"'>" +
                            "<div class='carBtnObjDone' value='1' onclick='pickupOrderReady(\""+varOrderId+ "\", 2, \"true\", this)' id='pickUpBtn"+j+"'>" +
                            "<p class='txt20 normal txtWhite'>HÄMTAD</p>" +
                            "</div>" +
                        "<div class='carBtnObjDone' value='2' onclick='pickupOrderReady(\""+varOrderId+ "\", 2, \"false\", this)' id='notPickUpBtn"+j+"'>" +
                        "<p class='txt20 normal txtWhite'>EJ HÄMTAD</p>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "</li>";
            }catch(e){}
                        finally {
                                    timeCheck(j, null, arrayResult, varOrderId);
                               }
        }
    }


}

// "<div class='carBtnObjDone' id='notPickUpBtn"+j+"'>" +
// "<p class='txt20 normal txtWhite'>HÄMTAD</p>" +
// "</div>" +

function respondOrder(popUp, orderId, time, method, siteId){
    loadingOn();
    var key = localStorage.getItem("keyRTC");
    var result = {
        "delivery_time" : time
    };
  // poll = setInterval(pollOrders, 3000);
    var success = function (result) {

        $(popUp).stop(true, true).fadeOut(500);
        loadingOff();
        getOrders();

        if(newOrderListIds.length != 0){
            for(var i = 0; i < newOrderListIds.length; i++ ){
                if(newOrderListIds[i] == orderId){
                    if(newOrderList[i]["id"] == orderId){
                        newOrderList.splice(i, 1);
                        newOrderListIds.splice(i, 1);
                    }
                    break;
                }
            }
            if(newOrderListIds.length == 0){
                $(popUp.parentNode).stop(true, true).fadeOut(500);
            }
        }

        if(getCookie("selectedPage") != "1"){
            setSelectedMenuLink(1);
        }



        //newOrderPopUp();
    };
    var error = function (result) {
        loadingOff();
    };
    if(method === "PATCH"){
        _patch(sitesEndpoint + "/" + siteId+ ordersEndpoint +"/"+orderId, success, error, JSON.stringify(result), key);
    }
    else if(method === "DELETE"){
        _delete(sitesEndpoint + "/" + siteId+ ordersEndpoint +"/"+orderId, success, error, JSON.stringify(result), key);
    }
}


function timeCheck(j, h, result, varOrderId){
    loadingOn();
    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");
    var dateNow;
        if(result){
                var orderEstimatedTime = result.estimated_delivery; // gets timestamp from database but the stamp is wrong, its late 2 hours
                if(orderEstimatedTime != null){
                    var newTime1 = orderEstimatedTime * 1000; // this converts timestamp from seconds to milliseconds.
                    dateNow = Date.now();
                    if(newTime1 > dateNow){
                       calculateTime(newTime1,dateNow);
                        if(varOrderDeliveryType == "DELIVER"){
                            if(h != null){
                                $('#carObj'+j+h).css('background-color','#5aaa96');
                            }
                            $('#'+varOrderId).css('background-color','#5aaa96')
                        } else if(varOrderDeliveryType == "PICKUP"){
                            $('#'+varOrderId).css('background-color','#D26A5B');
                            $('#pickUpBtn'+j).css('background-color','#D26A5B');
                            $('#notPickUpBtn'+j).css('background-color','#D26A5B');
                        }
                    }
                    else if(dateNow > newTime1){
                        calculateTime(newTime1, dateNow);
                        if(days < 0){
                            var tmp = newTime1;
                            newTime1 = dateNow;
                            dateNow = tmp;
                            calculateTime(newTime1, dateNow);
                        }
                        if(varOrderDeliveryType == "DELIVER"){
                            if(h != null){
                                $('#carObj'+j+h).css('background-color','#8b0057');
                            }
                            $('#'+varOrderId).css('background-color','#8b0057');
                        }else if(varOrderDeliveryType == "PICKUP"){
                            $('#notPickUpBtn'+j).css('background-color','#46245B');
                            $('#pickUpBtn'+j).css('background-color','#46245B');
                            $('#'+varOrderId).css('background-color','#46245B');
                        }
                    }
                    try{
                        var interval = setInterval(function() {
                            var date = new Date();
                            var countdownDate = orderEstimatedTime*1000;
                            var now = new Date().getTime();
                            var difference;
                            if(countdownDate > now){
                                difference = countdownDate - now;
                            } else {
                                difference = now - countdownDate;
                            }
                            var days = Math.floor(difference / (1000 * 60 * 60 * 24));
                            var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                            var seconds = Math.floor((difference % (1000 * 60)) / 1000);

                            if(hours < 10){
                                hours = "0" + hours;
                            }
                            if(minutes <  10){
                                minutes = "0" + minutes;
                            }
                            if(seconds < 10){
                                seconds = "0" + seconds;
                            }
                            if(countdownDate > now){
                                try {
                                    document.getElementById('timeToFinish' + j).innerHTML = hours +" : " + minutes + " : " + seconds;
                                }catch(e){}

                            } else {
                                try{
                                    document.getElementById('timeToFinish' + j).innerHTML = "-"+hours +" : " + minutes + " : " + seconds;
                                }catch(e){}

                            }
                        }, 1000);
                    }catch(e){}
                } else{
                }
        }
        loadingOff();

}

function calculateTime(newTime1, dateNow){
    var difference = (newTime1 - dateNow);

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    var secondsDifference = Math.floor(difference / 1000);

    days   = daysDifference;
    hour   = hoursDifference;
    minute = minutesDifference;
    second = secondsDifference;
}

function changeDateTime(StrDateTime){

    var localTime = StrDateTime + " " + "GMT"
    var currentDate = new Date(localTime);

    orderCreationTime = currentDate.toLocaleString("en-GB");

}

function showRec(orderId, userId){
    $("#popUpWrapOrderDetails").stop(true, true).fadeIn(500);
    loadingOn();
    var orderDetailDetails = document.getElementById('orderDetailsDetails');
    orderDetailDetails.innerHTML = "";
    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");

    var orderSuccess = function (result) {

        if(result){


            document.getElementById('orderDetailsTitle').innerHTML = "ORDER: " + orderId;

            for(var i = 0; i < result[0].orderLines.length; i++){
                var product     = result[0].orderLines[i];
                var productName = product.productName;
                var quantity    = product.quantity;

                document.getElementById('orderDetailsDetails').innerHTML +=
                    "<p class ='txt16 normal'>" + productName +  ' x'  + quantity+"</p>";

                if(result[0].orderLines[i].modifiers.length != 0){
                    for(var x = 0; x < result[0].orderLines[i].modifiers.length; x++){
                        var modifiers = result[0].orderLines[i].modifiers[x];
                        try{
                            var modifierName = modifiers.productName;
                            var modifierQuantity = modifiers.quantity;

                            document.getElementById('orderDetailsDetails').innerHTML +=
                                "<p class ='txt16 normal'> + " + modifierName + "</p>";

                        } catch(e){
                            console.dir("Error caught");
                        }
                    }
                }
            }

            orderCreationTime = result[0].creation_time;
            changeDateTime(orderCreationTime);
            document.getElementById('orderDetailsIncomingTime').innerHTML = "Beställd: " + orderCreationTime;
            if(result[0].name != null || result[0].name != undefined){

                var name =result[0].name;
                document.getElementById('orderDetailsName').innerHTML = name;
            }
            if(result[0].other_info !== null || result[0].other_info !== undefined ){

                var otherInfo = result[0].other_info;
                document.getElementById('commentTextAreaOrderDetails').value = otherInfo;
            }
            if(result[0].delivery_address == null || result[0].delivery_address == undefined || result[0].delivery_address == ""){
              // these try and errors are neccessary because some of the orders in RTC dont have adresses and names.
                document.getElementById('orderDetailsAddress').innerHTML = "Denna beställning kommer hämtas av kunden";
                document.getElementById('orderDetailsPostal').innerHTML  = "--";
                document.getElementById('orderDetailsFloor').innerHTML  = "--";
            } else if(result[0].delivery_address != null && result[0].delivery_address!= undefined && result[0].delivery_address != ""){

                try {    // these try and errors are neccessary because some of the earlier order in RTC dont have adresses and names.
                    var address       = result[0].delivery_address;
                    var street       = address.street;
                    var postCode     = address.areaCode;
                    var city         = address.city;
                    var postalAdress = postCode + ", " + city;
                    var floor = address.floor;
                    var accessCode = address.accessCode;
                    var apartment = address.apartment;
                    document.getElementById('orderDetailsName').innerHTML = name;
                    try{
                        if(result[0].delivery_type == "DELIVER"){
                            document.getElementById('orderDetailsAddress').innerHTML = street;
                        } else{
                            document.getElementById('orderDetailsAddress').innerHTML = "Denna beställning kommer hämtas av kunden";
                        }
                        if(result[0].delivery_type == "DELIVER"){
                            document.getElementById('orderDetailsPostal').innerHTML  = postalAdress;
                        } else{
                            document.getElementById('orderDetailsAddress').innerHTML = "Denna beställning kommer hämtas av kunden";
                        }
                        if(floor != null && floor != ""){
                            document.getElementById('orderDetailsFloor').innerHTML  += "Lgh "+ apartment + ".";
                        }
                        if(apartment != null && apartment != ""){
                            document.getElementById('orderDetailsFloor').innerHTML  += "Våning: "+ floor +".";
                        }
                        if(accessCode != null && accessCode != ""){
                            document.getElementById('orderDetailsFloor').innerHTML  += "Portkod: "+ accessCode +".";
                        }
                    } catch(e){
                        console.dir("Error caught")
                    }
                } catch(e){
                    console.dir("either name or adress was null");
                }


            }


        }
        loadingOff();
    };

    var error = function (result) {
        loadingOff();
    };

    _get(usersEndpoint +"/"+ userId + ordersEndpoint +"/"+ orderId ,orderSuccess, error, key);
}

function getOrderInformation(arrayResult){
    loadingOn();
    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");
    var userId  = arrayResult.user_id;
    var orderId = arrayResult.id;
    document.getElementById('newOrderDetails'+orderId).innerHTML = "";
    var success = function(result) {

        if(result){

        var orderLines = result[0].orderLines;

        for(var i = 0; i < orderLines.length; i++){
            var product     = result[0].orderLines[i];
            var productName = product.productName;
            var quantity    = product.quantity;
            document.getElementById('newOrderDetails'+orderId).innerHTML +=
                "<div id='product"+i+"'>"+
                    "<p class='txt16 normal'>" + quantity +" "+ productName +"</p>"+
                "</div>";

            if(result[0].orderLines[i].modifiers.length != 0){
                for(var x = 0; x < result[0].orderLines[i].modifiers.length; x++){
                    var modifiers = result[0].orderLines[i].modifiers[x];
                    var modifierName = modifiers.productName;
                    var modifierQuantity = modifiers.quantity;
                    document.getElementById('product'+i).innerHTML +=
                        "<p class='txt16 normal'>+ " + modifierName + "</p>";
                }
            }
        }
        orderCreationTime = result[0].creation_time;
        changeDateTime(orderCreationTime);
        document.getElementById('newOrderIncomingTime'+orderId).innerHTML ="Beställd: " +  orderCreationTime;

        if(result[0].name != null || result[0].name != undefined){
            var name = result[0].name;
            document.getElementById('newOrderName'+orderId).innerHTML = name;
        }
        if(result[0].delivery_address != null || result[0].delivery_address!= undefined){
            var adress       = result[0].delivery_address;
            var street       = adress.street;
            var postCode     = adress.areaCode;
            var city         = adress.city;
            var postalAdress = postCode + ", " + city;

            try {    // these try and errors are neccessary because some of the earlier order in RTC dont have adresses and names.
                var address       = result[0].delivery_address;
                var street       = address.street;
                var postCode     = address.areaCode;
                var city         = address.city;
                var postalAdress = postCode + ", " + city;
                var floor = address.floor;
                var accessCode = address.accessCode;
                var apartment = address.apartment;
                document.getElementById('orderDetailsName'+orderId).innerHTML = name;
                try{
                    if(result[0].delivery_address.city != 0) {
                        document.getElementById('newOrderAddress'+orderId).innerHTML = street + " " + city;
                    } else {
                        document.getElementById('newOrderAddress'+orderId).innerHTML = street;
                    }
                    if(result[0].delivery_type == "DELIVERY"){
                        document.getElementById('newOrderPostal'+orderId).innerHTML  = postalAdress;

                    } else  {
                        document.getElementById('newOrderPostal'+orderId).innerHTML  = "";

                    }

                    if(floor != null && floor != ""){
                        document.getElementById('newOrderFloor'+orderId).innerHTML  += "Lgh "+ apartment + ".";
                    }
                    if(apartment != null && apartment != ""){
                        document.getElementById('newOrderFloor'+orderId).innerHTML  += "Våning: "+ floor +".";
                    }
                    if(accessCode != null && accessCode != ""){
                        document.getElementById('newOrderFloor'+orderId).innerHTML  += "Portkod: "+ accessCode +".";
                    }
                } catch(e){
                    console.dir("Error caught")
                }
            } catch(e){
                console.dir("either name or adress was null");
            }
        }

        }
        loadingOff();
    };

    var error = function (result) {
        loadingOff();
    };
    _get(usersEndpoint +"/"+ userId + ordersEndpoint +"/"+ orderId ,success, error, key);
}

function print(elem,elem2){
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem2).innerHTML + document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();

    return true;
}

function orderReady(carID, orderId, carSiteId){
    loadingOn();
    var parentId = orderId.parentNode.parentNode.parentNode.parentNode.value;
    var listObjId = orderId.parentNode.parentNode.parentNode.parentNode.id;
    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");

    var success = function(result){

        var numberOfOrders = result.count;
        if(numberOfOrders > 10){
            alert("Bilen har redan " + numberOfOrders + " ordrar");
        }
        loadingOff();

       $('#'+listObjId).stop(true, true).fadeOut(500);
    };
    var error = function(result){
      loadingOff();
      console.dir("Error caught");

    };
    loadingOff();
    _put(sitesEndpoint +"/"+ carSiteId + vehiclesEndpoint +"/"+ carID +ordersEndpoint+ "?order=" + parentId, success, error, "", key);

}

function pickupOrderReady (orderId, value, response, parent){
    loadingOn();

    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");
    var siteId = localStorage.getItem("siteRTC");
    var listObjId = parent.parentNode.parentNode.parentNode.id;
    var parentDiv = parent.parentNode.id;
    var parentDivSibling = parent.parentNode.parentNode.parentNode.firstChild;
    var parentDivSiblingColor = parentDivSibling.style.backgroundColor;
    var btnDiv = document.getElementById(parentDiv);
    var data = {};
    var success = function(result){
        if(value == 1){
           btnDiv.innerHTML = "";
           btnDiv.innerHTML +=
               "<div class='carBtnObjDone' style='background-color: "+parentDivSiblingColor+"' value='2' onclick='pickupOrderReady(\""+varOrderId+ "\", 2, \"true\",this)' id='pickUpBtn"+j+"'>" +
               "<p class='txt20 normal txtWhite'>HÄMTAD</p>" +
               "</div>" +
               "<div class='carBtnObjDone' style='background-color: "+parentDivSiblingColor+"' value='2' onclick='pickupOrderReady(\""+varOrderId+ "\", 2, \"false\",this)' id='notPickUpBtn"+j+"'>" +
               "<p class='txt20 normal txtWhite'>EJ HÄMTAD</p>" +
               "</div>";
           loadingOff();
        }else if(value == 2){
            $('#'+listObjId).stop(true, true).fadeOut(500);
            loadingOff();
        }

        loadingOff();
    };
    var error = function(){
        loadingOff();
        console.dir("Error caught");
    };

    if(value == 1){
        _patch(sitesEndpoint + "/" + siteId + ordersEndpoint +"/"+ orderId +"?ready=" + response, success, error, "", key);
        loadingOff();
    }else if (value == 2){
        _patch(sitesEndpoint + "/" + siteId + ordersEndpoint +"/"+ orderId + "?pickedup=" +response, success, error,"", key);
        loadingOff();
    }
}

var zIndex = 999999999;

function newOrderPopUp(order){
    var popUpWrapNewOrder = document.getElementById("popUpWrapNewOrder");
    if(order != null){
        var orderId = order["id"];
        var siteId = order["site_id"];
        audio.play();
        popUpWrapNewOrder.innerHTML = popUpWrapNewOrder.innerHTML +
            "<div class='popUp newOrderDiv' id='newOrderDiv"+ orderId +"'>" +
            "<div class='popUpSection' id='newOrderInfo'>" +
            "<p class='txt20 bold'>*Ny order!</p>" +
            "<p class='txt16 normal' id='newOrderAddress"+orderId+"'></p>" +
            "<p class='txt16 normal' id='newOrderPostal"+orderId+"'></p>" +
            "<p class='txt16 normal' id='newOrderFloor"+orderId+"'></p>" +
            "<p class='txt16 normal' id='newOrderName"+orderId+"'></p>" +
            "<p class='txt16 normal' id='newOrderCustomerTime"+orderId+"'></p>" +
            "<p class='txt16 normal' id='newOrderIncomingTime"+orderId+"'></p>" +
            "<p class='txt15 normal' id='newOrderTitle"+orderId+"'>Order "+orderId+":</p>" +
            "<div id='newOrderDetails"+orderId+"'></div>" +
            "</div>" +
            "<div class='popUpSection'>" +
            "<button class='popUpBtn' id='newOrderTime15' onclick='respondOrder(this.parentNode.parentNode, "+orderId+", 15, \"PATCH\", "+siteId+")'>15 Minuter</button>" +
            "<button class='popUpBtn' id='newOrderTime30' onclick='respondOrder(this.parentNode.parentNode, "+orderId+", 30, \"PATCH\", "+siteId+")'>30 Minuter</button>" +
            "<button class='popUpBtn' id='newOrderTime45' onclick='respondOrder(this.parentNode.parentNode, "+orderId+", 45, \"PATCH\", "+siteId+")'>45 Minuter</button>" +
            "<button class='popUpBtn' id='newOrderTime60' onclick='respondOrder(this.parentNode.parentNode, "+orderId+", 60, \"PATCH\", "+siteId+")'>60 Minuter</button>" +
            "<button class='popUpBtn' id='newOrderTime75' onclick='respondOrder(this.parentNode.parentNode, "+orderId+", 75, \"PATCH\", "+siteId+")'>75 Minuter</button>" +
            "<button class='popUpBtn' id='newOrderTime90' onclick='respondOrder(this.parentNode.parentNode, "+orderId+", 90, \"PATCH\", "+siteId+")'>90 Minuter</button>" +
            "<button class='popUpBtn' id='newOrderTimeCustomer'>*Kundens tid (14:00)</button>" +
            "<button class='popUpBtn' id='newOrderDismiss' onclick='respondOrder(this.parentNode.parentNode, "+orderId+", 0, \"DELETE\", "+siteId+")'>Avböj order</button>" +
            "</div>" +
            "</div>";
        getOrderInformation(order);
        $("#popUpWrapNewOrder").stop(true, true).fadeIn(500);
        $("#newOrderDiv"+ orderId).css("z-index", zIndex);
        zIndex--;
    }
}