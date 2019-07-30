/**
 * Created by Henke on 2018-10-03.
 */
$(document).ready(function(){
    getCarsForRest();
    checkGeolocation();
    getThisRestInfo();

});

$(window).on("load", function () {
    myMap();

});


function getThisRestInfo() {
    var sessionKey = localStorage.getItem("keyRTC");
    var id = localStorage.getItem("siteRTC");

    var success = function(result){
        var lat = result.address.geo.latitude;
        var lng = result.address.geo.longitude;

        myMap("", lat, lng);

    };
    var error = function(){
        console.dir("error");
    };


    _get(sitesEndpoint + "/" + id,  success, error, sessionKey);

}

function getCarsForRest(){
    var id = localStorage.getItem("siteRTC");
    var sessionKey = localStorage.getItem("keyRTC");

    var success = function (result) {
        for(var i = 0; i < result.length; i++) {
            document.getElementById("bodyHeadId").innerHTML +=
                "<a class='carLink txt20' id='car"+result[i].id+"' onclick='carInfo(\""+result[i].id+ "\", \""+result[i].latitude+ "\",  \""+result[i].longitude+ "\"); /*carDeliveryPoints(0);*/'>"+result[i].name+"</a>";
        }
        document.getElementById("bodyHeadId").innerHTML +=
            "<a class='carLink txt20' id='carAll' onclick='carInfoAll()'>"+ "Alla bilar"+"</a>";
    };

    var error = function (result) {
        alert("error");
        loadingOff();
    };
    _get(sitesEndpoint + "/" + id + vehiclesEndpoint, success, error, sessionKey);


}


var clickedCarsArray = [];
var deliveryPointsArray = [
    ["0", "59.279157", "15.2165523"],
    ["1", "59.270551", "15.2228973"],
    ["2", "59.262865", "15.2058353"]
    ];
var allCarsArr = [
    ["0", "59.2802596", "15.2257319"],
    ["1", "59.274587", "15.205464"],
    ["2", "59.27884", "15.2024263"],
    ["3", "59.266214", "15.2190613"]
    ];


function carInfoAll() {

    var id = localStorage.getItem("siteRTC");
    var sessionKey = localStorage.getItem("keyRTC");

    var success = function (result) {

        var matIcon = {
            url: "img/sports-car.png", // url
            scaledSize: new google.maps.Size(25, 25), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(12, 12)
        };

        for (var i = 0; i < result.length; i++) {
            var position = {lat: result[i].latitude, lng: result[i].longitude};
            createMarkerAllCars(position);
        }
        function createMarkerAllCars() {
            var allcarsMarker = new google.maps.Marker({
                icon: matIcon,
                position: position,
                shadow: 'none',
                map: map
            });
        }

    };

    var error = function (result) {
        alert("error");
    };
    _get(sitesEndpoint + "/" + id + vehiclesEndpoint, success, error, sessionKey);




}

/*function addCar() {
    //alert("Denna Funk SKA INTE LIGGA HÄR");
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

            getCarsForRest();
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
*/

var map;
var posOfCar;
function carInfo(carId, latitude, longitude) {

    $(".carLink").removeAttr('style');

    var id = localStorage.getItem("siteRTC");
    var sessionKey = localStorage.getItem("keyRTC");

    var success = function (result) {

        if(result.status != "LOADED") {

            } else  {// OBS KOLLA VILKA STATUSAR EN BIL KAN HA!
            for (var i = 0; i < result.deliveries.length; i++) {
                carDeliveryPoints(result.deliveries[i].order_id, result.deliveries[i]["delivery_address"].latitude, result.deliveries[i]["delivery_address"].longitude);
            }
        }
    };

    var error = function (result) {
        alert("error");
    };
    _get(sitesEndpoint + "/" + id + vehiclesEndpoint +"/" +carId + ordersEndpoint, success, error, sessionKey);

    //https://matsugenapimanegement.azure-api.net/dev/api/v1/sites/20/deliveries/vehicles/27
    var lat = parseFloat(latitude);
    var lng = parseFloat(longitude);
    /*    posOfCar = {lat: 59.279428, lng:15.2068403 };
     */
    document.getElementById("car"+carId).style.color = "#DC4405";
    document.getElementById("car"+carId).style.borderBottom = "solid 3px #DC4405";


    posOfCar = {lat: lat, lng: lng};
    var obj = {};
    obj["carId"] = carId;
    obj["location"] = posOfCar;
    var isInArray = false;
    if (clickedCarsArray.length == 0) {
        clickedCarsArray.push(obj);

    } else {
        for (var i = 0; i < clickedCarsArray.length; i++) {
            if (clickedCarsArray[i].carId == carId) {
                isInArray = true;
                break;
            }
        }
        if(isInArray == false) {
            clickedCarsArray.push(obj);
        }
    }
    myMap(carId, lat, lng, posOfCar);
}



var urul;
function myMap(carId, latitude, longitude, posOfCar) {

    /*var lat = parseFloat(latitude);
    var lng = parseFloat(longitude);
*/
    if (latitude && longitude){
        var uluru = {lat: latitude, lng: longitude};
    } else {
        var uluru = {lat: 59.279428, lng:15.2068403};
    }
        map = new google.maps.Map(document.getElementById('mapWrap'), {
        zoom: 13,
        center: uluru,
        styles: [
            //{elementType: 'geometry', stylers: [{color: '#F8EBDC'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#F8EBDC'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#DC4405'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#DC4405'}]
            },
            /*{
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#5AAA96'}]
            },*/
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#DC4405'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#46245B'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway', // motorväg
                elementType: 'geometry',
                stylers: [{color: '#F2A900'}]
            },
            {
                featureType: 'road.highway', // Motorväg konturer
                elementType: 'geometry.stroke',
                stylers: [{color: '#D26A5B'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#DC4405'}]
            },

]
    });
    var matIcon = {
        url: "img/sports-car.png",
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0,0), // origin*/
        anchor: new google.maps.Point(12, 12) // anchor
    };

    var carMarker = new google.maps.Marker({
        position: posOfCar,
        icon: matIcon,
        map: map
    });
    var carInfo = '<div class="carInfo">'+
            '<div class="styleThis">'+
            '<a class="txt14 txtAllWhite txtLeft" id="car"> *Bil1</a>'+
            '</div>';
    carMarker.infoWindow = new google.maps.InfoWindow({
        content: carInfo
    });

    google.maps.event.addListener(carMarker, 'click', function () {
        carMarker.infoWindow.open(map, carMarker);
        google.maps.event.addListener(carMarker, 'zoom-changed', function () {
            carMarker.infoWindow.close(map, carMarker);
        });

        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();

        iwBackground.children(':nth-child(2)').css({'display': 'none'});
        iwBackground.children(':nth-child(4)').css({'display': 'none'});


        iwOuter.parent().parent().css({left: '75px'}); //move the window to the right
        iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
            return s + 'border-top: none'
        });

// Moves the arrow 76px to the left margin
        iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
            return s + 'left: 20px !important; top: 20px !important;'
        });
        iwBackground.children(':nth-child(3)').find('div').children().css({
            'z-index': '1',
            'background-color': '#5AAA96',
            'display': 'none'
        });
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({'display': 'none'});

    });



    //carDeliveryPoints(carId, matIcon);

}

var clicked = true;
function carDeliveryPoints(orderId, delivLat, delivLng) {
    var matIcon = {
        url: "img/Matsugen_symbol_CMYK_pos_25.png",
        /*scaledSize: new google.maps.Size(17, 17), // scaled size
        origin: new google.maps.Point(0,0), // origin*/
        anchor: new google.maps.Point(12, 12) // anchor
    };

    var delivLatitude = parseFloat(delivLat);
    var delivLongitude = parseFloat(delivLng);
            var pos = new google.maps.LatLng(delivLatitude, delivLongitude);
            createMarker(pos, orderId);

        function createMarker(pos, orderId) {
            var deliveryMarker = new google.maps.Marker({
                icon: matIcon,
                position: pos,
                shadow: 'none',
                map: map,
                id: i
            });
            var deliveryInfo = '<div class="infoContent">' +
                '<a class="txt14 txtAllWhite txtLeft" id="orderId">' + orderId + '</a>' +
                '<a class="txt14 txtAllWhite txtRight" id="orderTime"> *14:45</a>' +
                '<p class="txt14 txtAllWhite txtLeft txtMargin" id="orderStatus"> *LEVERERAD </p>' +
                '</div>';

            deliveryMarker.infoWindow = new google.maps.InfoWindow({
                content: deliveryInfo
            });

            deliveryPointsOpen();
            function deliveryPointsOpen() {

                deliveryMarker.infoWindow.open(map, deliveryMarker);
                var iwOuter = $('.gm-style-iw');
                var iwBackground = iwOuter.prev();

                iwBackground.children(':nth-child(2)').css({'display': 'none'});
                iwBackground.children(':nth-child(4)').css({'display': 'none'});


                iwOuter.parent().parent().css({left: '75px'}); //move the window to the right
                iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
                    return s + 'border-top: none'
                });

// Moves the arrow 76px to the left margin
                iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
                    return s + 'left: 20px !important; top: 20px !important;'
                });
                iwBackground.children(':nth-child(3)').find('div').children().css({
                    'z-index': '1',
                    'background-color': '#5AAA96',
                    'display': 'none'
                });
                var iwCloseBtn = iwOuter.next();
                iwCloseBtn.css({'display': 'none'});
            }
            google.maps.event.addListener(deliveryMarker, 'click', function () {
                if(clicked == true){
                    clicked = false;

                    deliveryPointsOpen();


                } else if(clicked == false){
                    deliveryMarker.infoWindow.close(map, deliveryMarker);
                    clicked = true;
                }
            });
        }
}

function checkGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("noSupp");
    }

}
function showPosition(position) {
    //alert(position);
    urul = {lat: position.coords.latitude, lng: position.coords.longitude};
    //alert("Lat" + position.coords.latitude);
    //alert("Lng" + position.coords.longitude);
}
