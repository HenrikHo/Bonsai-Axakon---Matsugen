/**
 * Created by henri on 2017-08-15.
 */
$(document).ready(function() {
});

$(window).on("load", function () {
    getUser();
});
var loggedIn = sessionStorage.getItem("loggedIn");
var loggedInLocal = localStorage.getItem("remember");

var varData;

function contactThisRestaurant(){
    var ownerName = document.getElementById("connectName").value;
    var ownerEmail = document.getElementById("connectEmailSender").value;
    var ownerPhone = document.getElementById("connectPhoneNumber").value;
    var organisationNumber = document.getElementById("connectOrganisationNumber").value;
    var restaurantName = document.getElementById("connectRestaurantName").value;
    var messageFromRestOwner = document.getElementById("connectMessage").value;
    //validationCheck();
    alert( " Tack för din ansökan " +ownerName +"! Vi kommer kontakta din resturang: "+ restaurantName +"Med org.nummer: "+ organisationNumber+ " på Email: " + ownerEmail +" och telefon: "+ownerPhone);
    if (messageFromRestOwner)
    {
        alert("Pm: " +messageFromRestOwner);
    }
    varData = {
            "name"           : ownerName,
            "email"          : ownerEmail,
            "phone"          : ownerPhone,
            "orgNr"          : organisationNumber,
            "restName"       : restaurantName,
            "subject"        : messageFromRestOwner

    };

}

function sendEmail(){
    $.ajax({
        type: "POST",
        url: 'php/mail.php',
        data: JSON.stringify(varData), // use this or data, but the connectmessage will not be put in-
        success : function(res) {
            alert("you've sent an email! ");


        }

    });
}


function getUser(){
    if(loggedInLocal == true || loggedIn == true) {
        loadingOn();
        var ownerName = document.getElementById("connectName");
        var ownerEmail = document.getElementById("connectEmailSender");
        var ownerPhone = document.getElementById("connectPhoneNumber");


        var remember = localStorage.getItem("remember");
        var userId;
        if (remember === "true") {
            userId = localStorage.getItem("user");
        }
        else {
            userId = sessionStorage.getItem("user");
        }

        var success = function (result) {
            check401(result);
            if (result) {
                ownerName.value = result.first_name + " " + result.last_name;
                ownerEmail.value = result.email;
                ownerPhone.value = result.phonenumber;
            }
            loadingOff();
        };
        var error = function (result) {
            loadingOff();
        };
        _get(usersEndpoint + "/" + userId, success, error, sessionKey);
    }

}

function validationCheck (){
    var orgNr       = document.getElementById("connectOrganisationNumber");
    var restName    = document.getElementById("connectRestaurantName");
    var name        =  document.getElementById("connectName");
    var phone       = document.getElementById("connectPhoneNumber");
    var email       = document.getElementById("connectEmailSender");

    if(orgNr.innerHTML.length < 10 || orgNr.innerHTML.length == null){
        alert("Organisations Nummret måste vara 10 siffrigt");

         } if(restName.innerHTML.length == 0){
            alert("skriv en restaurang som du vill ansluta till");
    }
              if(name.innerHTML.length == 0){
                alert("Fyll i ditt namn");
    }
                    if(email.innerHTML.length == 0){
                      alert("Fyll i email");
    }
                         if(phone.innerHTML.length == 0 || phone.innerHTML.length < 10){
                            alert("fyll i ditt telefon nummer");
    }

}
