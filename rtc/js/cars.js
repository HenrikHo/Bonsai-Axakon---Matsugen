$(document).ready(function() {
});

$(window).on("load", function () {

});

var carHour;
var carMinute;
var carSecond;

function getCars(callback){
    loadingOn();
    var carsWrap = document.getElementById("carsWrap");
    var id = localStorage.getItem("userRTC");
    var siteId = localStorage.getItem("siteRTC");
    var key = localStorage.getItem("keyRTC");
    var carName;
    var carRegistration;
    var carId;

    autoFill(siteId);
    carsWrap.innerHTML = carsWrap.innerHTML +
        "<div class='carObj'>" +
        "<a class='carLink txt40' id='addCar' onclick='openAddCar();'>"+"+"+"</a>"+
        "</div>";

    carsWrap.innerHTML = carsWrap.innerHTML +
        "<div class='carObj'>" +
        "<a class='carLink txt20' id='addCar' onclick='addDriver()'>"+"Förare"+"</a>"+
        "</div>";


    var success = function (result){

            for (var i = 0; i < result.length; i++) {

                carName = result[i].name;
                carRegistration = result[i].registration;
                carId = result[i].id;

                carsWrap.innerHTML = carsWrap.innerHTML +
                    "<div class='carObj' id='carDiv"+carId+"'>" +
                    "<p class='txt20 bold carObjName'>" + carName + "</p>" +
                    "<p class='txt16 bold carObjNumber'>" + carRegistration + "</p>" +
                    "<div class='carObjListWrap'>" +
                    "<ul class='list' id='carsOrdersList" + i + "'>" +
                    "</ul>" +
                    "</div>" +
                    "</div>";

                if(result[i].status == "IDLE") {
                listOrdersInCar(carId, i);
            }else if(result[i].status == "DELIVERING" || result[i].status == "LOADED"){ // OBS KOLLA UPP DENNA! ß
                    listOrdersInCar(carId, i, result[i].status);

/*
                    carsOrdersList = document.getElementById("carsOrdersList" + i);
                    carsOrdersList.innerHTML = carsOrdersList.innerHTML +
                        "<li class='listObj' id='listObj" + i + "' value=''>" +
                        "<div class='carNotHome'>" +
                        "<p class='txt16 bold carNotHomeColor'>TID TILLBAKA:</p>" +
                        "<p class='txt20 bold carNotHomeColor'>*07:53</p>" +
                        "</div>" +
                        "</li>";*/
                }
        }
            callback();

            loadingOff();

    };
    var error = function(result){
        loadingOff();
        console.dir("Error Occured");
    };
    loadingOff();
try{
    _get(sitesEndpoint + "/"+ siteId + vehiclesEndpoint, success, error, key);
}catch(e){}

}

function addCar() {
    loadingOn();

    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");
    var carName = document.getElementById("carNameInput").value;
    var bil = document.getElementById("carRegNumber").value;
    var data = {
        "name": carName,
        "registration": bil
    };


    var success = function (result) {
        loadingOff();
        if(carName && bil) {
            document.getElementById("carsWrap").innerHTML = "";

            getCars();
        } else {

            if(!carName){
                document.getElementById("carNameInput").scrollIntoView();
            } else if(!bil){
                document.getElementById("carRegNumber").scrollIntoView();
            }
        }
        closeAddCar();
    };
    var error = function () {
        loadingOff();
        alert("nu blev det något knasigt...");
    };


    _post(sitesEndpoint + "/" + restId + vehiclesEndpoint, success, error, JSON.stringify(data), sessionKey);

}
function autoFill(siteId) {
    var key = localStorage.getItem("keyRTC");

    var success = function(result){

        var lowCase = result.name.toLowerCase();
        document.getElementById("autoFill").innerHTML = "@"+lowCase+"";

    };
    var error = function(result){

    };

    _get(sitesEndpoint +"/"+ siteId ,success , error, key);


}



function deleteOrder(carId, carOrderId, div){
    loadingOn();
    var id = localStorage.getItem("userRTC");
    var siteId = localStorage.getItem("siteRTC");
    var key = localStorage.getItem("keyRTC");
    var data = {};
    var success = function(result){

        var btn = "car" + carId;
        var parentLi = div.parentNode.parentNode.parentNode.parentNode.value;
        var listLi =  div.parentNode.parentNode.parentNode.parentNode.id;
        var parentUl = div.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        var ul = $('#'+parentUl+ ' li');

        $('#'+listLi).stop(true, true).fadeOut(500);


        if(ul.length == 1){
            $('#'+btn).stop(true, true).fadeOut(500);
        }


        loadingOff();

    };
    var error= function(result){
        loadingOff();
      console.dir("Error Caught, unable to remove order");
    };

    _delete(sitesEndpoint + "/" + siteId + vehiclesEndpoint + "/" + carId + ordersEndpoint + "/" + carOrderId, success, error, data, key);


    loadingOff();
}

function sendCar(btnId,carId){
    loadingOn();
    var id = localStorage.getItem("userRTC");
    var siteId = localStorage.getItem("siteRTC");
    var key = localStorage.getItem("keyRTC");

    var btn = "car" + carId;
    var data= {};


    var success = function(result){
    $('#carDiv'+carId).stop(true, true).fadeOut(500);
    $('#'+ btnId).stop(true, true).fadeOut(500);


        loadingOff();
    };
    var error = function (result){
        loadingOff();
    };

    _post(sitesEndpoint + "/" + id  + vehiclesEndpoint +"/"+ carId + "/deliver", success, error, data, key);
}


function listOrdersInCar (carId,i, statusOfCar){

    loadingOn();
    var id = localStorage.getItem("userRTC");
    var siteId = localStorage.getItem("siteRTC");
    var key = localStorage.getItem("keyRTC");
    var orderId;
    var estimatedTimeDelivery;
    var carsOrdersList = document.getElementById("carsOrdersList" + i);
    var success = function(result){
        if(result != null || result != undefined){

            if(result.length != 0){
            for (var x = 0; x < result.length; x++) {

                    orderId = result[x].id;
                    estimatedTimeDelivery = result[x].estimated_delivery;

                    document.getElementById("carsOrdersList" + i).innerHTML = document.getElementById("carsOrdersList" + i).innerHTML +
                        "<li class='listObj' id='listObj" + x + "' value='" + i + "'>" +
                        "<div>" +
                        "<div class='carObjInfo carObjInfoDiv' id='"+carId+"'>" +
                        "<div class='carInfoTextDiv'>" +
                        "<a class='txt20 bold listObjNumber resizeFontSize'>" + orderId + "</a>" +
                        "<a class='listObjInfoTime txt20 bold resizeFontSize' id='carTime"+x+"''>*14:41</a>" +
                        "<img class='popUpCloseBtn resizePopUpCloseBtn' src='../rtc/img/close.png' onclick='deleteOrder(\""+carId+ "\", \""+orderId+ "\", this)'>"+
                        "</div>" +

                        "<p class='listObjInfoAddress txt20 normal resizeFontSize'>"+ result[x].street +"</p>" +
                        "</div>" +
                        "</div>" +
                        "</li>";

                    calcTime(estimatedTimeDelivery,x);

            }
            if (statusOfCar){
                document.getElementById("carsOrdersList" + i).innerHTML = document.getElementById("carsOrdersList" + i).innerHTML +
                    "<button class='popUpBtn carStartShipment' id='car"+carId+"'>Inte i garaget</button>";
                document.getElementById("car"+ carId).style.backgroundColor ="rgba(0, 0, 0, 0.5)";
            } else {
                document.getElementById("carsOrdersList" + i).innerHTML = document.getElementById("carsOrdersList" + i).innerHTML +
                    "<button class='popUpBtn carStartShipment' id='car" + carId + "' onclick='sendCar(this.id," + carId + ")'>Starta utkörning</button>";
            }
            }else{
                /*
                    carsOrdersList = document.getElementById("carsOrdersList" + i);
                    carsOrdersList.innerHTML = carsOrdersList.innerHTML +
                    "<li class='listObj' id='listObj" + i + "' value='" + 5 + "'>" +
                    "<div class='carNotHome'>" +
                    "<p class='txt16 bold carNotHomeColor'>TID TILLBAKA:</p>" +
                    "<p class='txt20 bold carNotHomeColor'>07:53</p>" +
                    "</div>" +
                    "</li>";
                    */
            }
        }


        loadingOff();
    };
    var error = function(result){
    loadingOff();
    };


    try{
        _get(sitesEndpoint +"/" + siteId + vehiclesEndpoint + "/" + carId + ordersEndpoint, success, error, key);
    }catch(e){}

}

function calcTime(estTime,i) {
    var newTime1 = estTime * 1000;
    var dateNow = Date.now();
    var difference = (newTime1 - dateNow);

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    var secondsDifference = Math.floor(difference / 1000);

    //days   = daysDifference;
    carHour   = hoursDifference;
    carMinute = minutesDifference;
    carSecond = secondsDifference;
    document.getElementById("carTime"+i).innerHTML = carHour + ": " + carMinute;
}




function addDriverToSite (){
    loadingOn();
    //var id = localStorage.getItem("userRTC");
    var siteId = localStorage.getItem("siteRTC");
    var key = localStorage.getItem("keyRTC");
    var driverName = document.getElementById("userNameInput").value;
    var driverPw =  document.getElementById("driverPw").value;

    var data = {
        "username": driverName,
        "password": driverPw
    };
    var success = function(result){
      alert("Förare: "+ driverName+ " är nu skapad! ");

      $('#popUpWrapAddDriver').stop(true, true).fadeOut(500);
        loadingOff();
    };
    var error = function (){
        console.dir("Error caught");
        loadingOff();
    };
    _post(sitesEndpoint + "/"+  siteId + driversEndpoint ,success, error, JSON.stringify(data), key);
}


function listDrivers(index){
    loadingOn();

    var id = localStorage.getItem("userRTC");
    var siteId = localStorage.getItem("siteRTC");
    var key = localStorage.getItem("keyRTC");

    var success = function(result){

        for(var i = 0; i < result.length; i++){
            document.getElementById("carsOrdersList" + i).innerHTML = document.getElementById("carsOrdersList" + i).innerHTML +
                "<li class='listObj' id='listObj' value=''>" +
                "<div>" +
                "<div class='carObjInfo carObjInfoDiv' id=''>" +
                "<div class='carInfoTextDiv'>" +
                "<a class='txt20 bold listObjNumber'>" + orderId + "</a>" +
                "<img class='popUpCloseBtn' src='../rtc/img/close.png' onclick=''>"+
                "</div>" +
                "<p class='listObjInfoAddress txt16 normal'>*Förare1</p>" +
                "</div>" +
                "</div>" +
                "</li>";
        }
        loadingOff();
    };
    var error = function (){
      loadingOff();
      console.dir("Error caught");
    };
}









































