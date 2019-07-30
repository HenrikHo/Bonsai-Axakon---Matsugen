$(document).ready(function() {
    if(sessionStorage.getItem("loggedIn") == "true" || getCookie("loggedIn") == "true"){
        sessionStorage.setItem("selectedPage", "1");
        whatMenuCookie();

    }
});

$(window).on("load", function () {
    slideshow();
    setInterval(slideshow, 10000);
    $("#menuLogoHead").hide();

});

var imgNr = 0;
function slideshow(){
    var oldImgNr;
    if(imgNr === 4){
        oldImgNr = 4;
        imgNr = 1;
    }
    else{
        oldImgNr = imgNr;
        imgNr = imgNr + 1;
    }
    var oldImg = document.getElementById("homeBannerImg"+oldImgNr);
    var newImg = document.getElementById("homeBannerImg"+imgNr);
    $(oldImg).fadeOut(1000);
    $(newImg).fadeIn(1000);
}
function getUserLocation(){
    //document.getElementById("getGeoImg").style.WebkitAnimation = "spin 1s linear infinite"
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position){
    $("#getGeoImg").attr({style : ""});
    var Latitude =  position.coords.latitude;
    var Longitude =  position.coords.longitude;

    //        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=59.2688339,15.177441700000001&key=AIzaSyCsxuU1O-BeOLZS5MABhj4D9yW7CiBomcA",

    var baseURLGOOGLE = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    var googleKey = "&key=";
    var googleApiKey = "AIzaSyCsxuU1O-BeOLZS5MABhj4D9yW7CiBomcA";

    $.ajax({
        url: baseURLGOOGLE + Latitude + "," + Longitude + googleKey + googleApiKey,
        type: "GET",

        success: function(result){

            for(var i = 0; i < result["results"].length; i++){
                if (result["results"][0].address_components[i].types != null) {
                    var types = result["results"][0].address_components[i].types;
                    for (var j = 0; j < types.length; j++)
                        if (types[j] == 'postal_code') {

                            var zipCode = result["results"][0].address_components[i]["long_name"];
                            // console.dir(zipCode);
                            document.getElementById("homeAddress").value = zipCode;
                        }
                }
            }

        },
        error: function (error){

        }
    });
}


