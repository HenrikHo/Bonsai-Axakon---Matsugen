function genderCheckboxChange(type){
    var male = document.getElementById("genderCheckboxMale");
    var female = document.getElementById("genderCheckboxFemale");
    if(type === 0){
        if(male.checked === false){
            male.checked = false;
        }
        else {
            male.checked = true;
            female.checked = false;
        }
    }
    else if(type === 1){
        if(female.checked === false){
            female.checked = false;
        }
        else {
            male.checked = false;
            female.checked = true;
        }
    }
}
/*

function autoFill(){
    var remember = localStorage.getItem("remember");
    if(remember === 'true') {
        var email = localStorage.getItem("email");
        var pw = localStorage.getItem("password");


        document.getElementById("userName").value = email;
        document.getElementById("password").value = pw;
    }

}
*/


function newLogIn(email, password, register){
    document.getElementById('acceptButton').disabled = 'disable';
    loadingOn();

        email = document.getElementById('userName').value;
        password = document.getElementById('password').value;


        var userName1 = 'hej@gmail.com';
        var password1 = '123';
        var keepMeLoggedIn = document.getElementById("keepMeLoggedInBox").checked;
        var remember = localStorage.getItem("remember");

        if(email == userName1 && password == password1){

            document.getElementById('acceptButton').disabled = 'enable';

            localStorage.setItem("email", email);


            if(keepMeLoggedIn == true || remember == "true"){
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
                localStorage.setItem("remember", "true");
             //   localStorage.setItem("user", userId);
             //   localStorage.setItem("key", key);
                setCookie("loggedIn", "true");
            } else {
                sessionStorage.setItem("password", password);
              //  sessionStorage.setItem("user", userId);
              //  sessionStorage.setItem("key", key);
                sessionStorage.setItem("loggedIn", "true");
            }
            loadingOff();
            document.getElementById('acceptButton').disabled = 'enable';

            location.reload();

            window.location.replace("../web/settings.php");
            loadingOff();
        }


}



function logIn(email, password, register) {
    document.getElementById('acceptButton').disabled = 'disable';

    loadingOn();
    if(!email && !password){
        email = document.getElementById("userName").value;
        password = document.getElementById("password").value;
    }
    var keepMeLoggedIn = document.getElementById("keepMeLoggedInBox").checked;
    var remember = localStorage.getItem("remember");

    var data = {
        id: email,
        password: password
    };
    var success = function(result) {
        document.getElementById('acceptButton').disabled = 'enable';

        var userId = (result.id);
        var key = result.authorization['key'];
        $.ajax({
            url: baseUrlWeb + logInPath,
            type: "POST",
            data: {
                logInId: userId
            },
            success: function(result){
                document.getElementById('acceptButton').disabled = 'enable';

                localStorage.setItem("email", email);
                if(keepMeLoggedIn == true || remember == "true"){
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("remember", "true");
                    localStorage.setItem("user", userId);
                    localStorage.setItem("key", key);
                    setCookie("loggedIn", "true");
                } else {
                    sessionStorage.setItem("password", password);
                    sessionStorage.setItem("user", userId);
                    sessionStorage.setItem("key", key);
                    sessionStorage.setItem("loggedIn", "true");
                }
                loadingOff();
                if(register == "1"){
                    window.location.replace("../web/settings.php")
                } else{
                    document.getElementById('acceptButton').disabled = 'enable';

                    location.reload();
                }
            },
            error: function (error) {
                document.getElementById('acceptButton').disabled = 'enable';

                loadingOff();
            }
        });
    };
    var error = function(result) {
        //check401(result);
        //console.log(error.responseText);
        document.getElementById('acceptButton').disabled = 'enable';
        alert("Användarnamn eller Lösenord är felaktigt");
        loadingOff();
    };

    if(email && password) {
        _post(loginEndpoint, success, error, JSON.stringify(data));
    } else {
        alert("Var god  fyll i användarnamn och lösenord");
        loadingOff();
    }
}


function logOut(){
    loadingOn();
    $.ajax({
        url: baseUrlWeb + logInPath,
        type: "POST",
        data: {
            logOut: "logOut"
        },
        success: function(result){
            if(localStorage.getItem("remember")){
                localStorage.removeItem("email");
                localStorage.removeItem("password");
                localStorage.removeItem("remember");
                localStorage.removeItem("user");
                localStorage.removeItem("key");
                deleteCookie("loggedIn");
            }
            else{
                sessionStorage.removeItem("password");
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("key");
                sessionStorage.removeItem("loggedIn");
            }
            loadingOff();
            location.reload();
        },
        error: function (error) {
            loadingOff();
        }
    });
}

function sendNewPassword(){
    loadingOn();
    var sendEmailTo = document.getElementById("forgottenUserName").value;
    var success = function(result){
        alert("En återställningslänk kommer skickas till " +sendEmailTo+"");
        $('#popUpWrap3').stop(true, true).fadeOut(500);
        loadingOff();
    };
    var error = function(result){
        alert("Något gick fel, försök igen!");
        loadingOff();
    };
    if(sendEmailTo != null && sendEmailTo != ""){
        _get(loginEndpoint + forgotEndpoint+"?user="+sendEmailTo, success, error, globalAnonKey);
    } else{
        alert("Vänligen fyll i mailadress");
        loadingOff();
    }
}


function forgottenPassword(){
    $("#popUpWrap3").stop(true, true).fadeIn(500);
}

function redirectToLogIn() {
    $("#popUpWrap3").stop(true, true).fadeOut(500);
    $("#popUpWrap1").stop(true, true).fadeIn(500);
}
function redirectToCreateAcc(){
    $("#popUpWrap3").stop(true, true).fadeOut(500);
    $("#popUpWrap2").stop(true, true).fadeIn(500);
}

function loadingOn() {
    $("#popUpWrapLoader").stop(true, true).fadeIn(500);
}
function loadingOff(){
    $("#popUpWrapLoader").stop(true, true).fadeOut(500);
}

function setCookie(name, val) {
    var date = new Date();
    date.setTime(date.getTime() + 86400000);
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + val + ";" + expires + ";path=/";
}
function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function getCookie(cName){
    var name = cName+ "=";
    var deCookie = decodeURIComponent(document.cookie);
    var array = deCookie.split(";");
    var cookie = "";
    for(i = 0; i < array.length; i++){
        var item = array[i];
        while(item.charAt(0) == " "){
            item = item.substring(1);
        }
        if(item.indexOf(name) == 0){
            cookie = item.substring(name.length, item.length);
        }
    }
    return cookie;
}
var latitude;
var longitude;

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(result) {
            latitude = result.coords.latitude;
            longitude = result.coords.longitude;
        });
    }
    else{
        longitude = "null";
        latitude = "null";
    }
}

function imageExist(url) {
    url.onload = function () {
      console.dir("image loaded");
      return true;
    };
    url.onerror = function () {
        console.dir("image error")
        return false;
    }
}

function imageError(img){
    img.onerror = "";
    img.src = 'img/Matsugen_symbol_Gray.png';

    return true;
}



function registerUser(){
    loadingOn();
    $("#obligated").attr({style : ""});

    var termsCheck = document.getElementById('termsConfCheckbox').checked;

     if(termsCheck == true) {

         var firstName = document.getElementById("myPageFirstName").value;
         var lastName = document.getElementById("myPageSurName").value;
         var email = document.getElementById("myPageEmail").value;
         var phone = document.getElementById("myPagePhoneNumber").value;
         var password = document.getElementById("myPagePassword").value;
         var passwordConf = document.getElementById("myPagePasswordConf").value;
         var street = document.getElementById("myPageAddress").value;
         var postCode = document.getElementById("myPagePostCode").value;
         var city = document.getElementById("myPageCity").value;
         var apNr = document.getElementById("myPageApNr").value;
         var floor = document.getElementById("myPageFloor").value;
         var doorCode = document.getElementById("myPageDoorCode").value;
         var otherInfo = document.getElementById("myPageOtherInfo").value;

         var reg = (/^[a-zA-ZäöåÄÖÅ]+$/);
         var regPass = (/^[0-9a-zA-Z]{2,}$/);
         var regEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/);
         var regDigit = /^\d+$/;

         var registerData = {
             "phonenumber": phone,
             "username": email,
             "password": password,
             "first_name": firstName,
             "last_name": lastName,
             "email": email,
             "address": {
                 "street": street,
                 "floor": floor,
                 "access_code": doorCode,
                 "city": city,
                 "area_code": postCode,
                 "country": "SWE",
                 "geo": {
                     "longitude": longitude,
                     "latitude": latitude
                 }
             },
             "device_token": "test"
         };


         if (firstName && lastName && reg.test(firstName) && reg.test(lastName) &&
             email && regEmail.test(email) &&
             phone && regDigit.test(phone) &&
             password && regPass.test(password) && passwordConf === password &&
             street && postCode && city) {

                 var success = function (result) {
                     check401(result);
                     loadingOff();
                     logIn(email, password, "1");
                 };

                     var error = function (error) {
                         if (error.responseText == "User exists") {
                             alert("Det finns redan en användare med denna mailadress \nFörsök igen med en annan adress!");
                         }

                         loadingOff();
                     };
                     _post(usersEndpoint, success, error, JSON.stringify(registerData), sessionKey);
         }
         else if (!firstName || !lastName || !email || !phone ||
             !password || !passwordConf || !street || !postCode || !city) {
             document.getElementById("obligated").style.color = "red";
             document.getElementById("obligated").scrollIntoView();
             loadingOff();
         }
         else if ((firstName && !reg.test(firstName)) || (lastName && !reg.test(lastName))) {
             alert("Var snäll och ange ett giltigt förnamn och efternamn!");
             document.getElementById("obligated").style.color = "red";
             document.getElementById("obligated").scrollIntoView();
             loadingOff();
         }
         else if (email && !regEmail.test(email)) {
             alert("Var snäll och ange ett giltigt mailadress!");
             document.getElementById("obligated").style.color = "red";
             document.getElementById("obligated").scrollIntoView();
             loadingOff();
         }
         else if (phone && !regDigit.test(phone)) {
             alert("Var snäll och ange ett giltigt telefonnummer!");
             document.getElementById("obligated").style.color = "red";
             document.getElementById("obligated").scrollIntoView();
             loadingOff();
         }
         else if ((password && !regPass.test(password))) {
             alert("Var snäll och ange ett giltigt lösenord!");
             document.getElementById("obligated").style.color = "red";
             document.getElementById("obligated").scrollIntoView();
             loadingOff();
         }
         else if (passwordConf !== password) {
             alert("Lösenorden matchar inte! Försök igen");
             loadingOff();
         }
     }else if(termsCheck == false){
         document.getElementById("termsAndConditions").style.color = "red";
         document.getElementById("termsAndConditions").scrollIntoView();
         loadingOff();

     }
     loadingOff();
}

function checkboxClick(cb){
    if(cb.checked){
        $("#termsAndConditions").attr({style : ""});
        cb.parentNode.style.backgroundColor = "#DC4405";
    }
    else if(!cb.checked){
        cb.parentNode.style.backgroundColor = "transparent";
    }
}

function search(searchVal){
    loadingOn();
    if(typeof searchVal === 'string'){
         if(searchVal == ""){
             searchVal = null;
        }
    }
    if(sessionStorage.getItem("anonLoggedIn") == "true"){
        $.ajax({
            url: baseUrlWeb + logInPath,
            type: "POST",
            data: {
                anonId: "anonymous"
            },
            success: function(result){
                /*var key = sessionStorage.getItem("anonKey");
                alert(key);*/
            },
            error: function (error) {
                loadingOff();
            }

        });
    }
    var success = function (result) {
        check401(result);
        if(result != null){
            sessionStorage.setItem("searchResult", JSON.stringify(result["data"]));
            //var searchResult = JSON.parse(sessionStorage.getItem("searchResult"));
            //console.dir(searchResult);

            window.location = baseUrlWeb + searchPath;
        }
        else{

            loadingOff();
        }
    };
    var error = function (result) {
        check401(result);
        console.log("Something went wrong with the connection");
        loadingOff();
    };

    if(typeof searchVal === 'string'){
        _get(sitesEndpoint + "?search=" + searchVal, success, error, sessionKey);

    } else {
        _get(sitesEndpoint + "?search=", success, error, sessionKey);
    }

}


function redirectToRestaurant(restaurantId) {
    //alert(restaurantId);
    var id = sessionStorage.getItem("restaurantId");
    if(id != null && id != restaurantId){
        localStorage.removeItem("cart");
    }
    sessionStorage.setItem("restaurantId", restaurantId);
}

function eraseFromFavorite(name , id ) {
    loadingOn();

    if (confirm("Är du säker på att du vill ta bort " + name + " från din favoritlista?") == true) {
        var remember = localStorage.getItem("remember");
        var userId;
        if(remember === "true"){
            userId = localStorage.getItem("user");
        }
        else{
            userId = sessionStorage.getItem("user");
        }
        var data = {
            "siteId" : id
        };
        var success = function (result) {
            check401(result);
            document.getElementById("rightSideDiv").innerHTML = "";
            getFavorite();
            loadingOff();
            //location.reload();
        };
        var error = function (result) {
            check401(result);
            loadingOff();
            console.log("Something went wrong with the connection");
        };
        _delete(usersEndpoint + "/"+userId + favouritesEndpoint, success, error, JSON.stringify(data), sessionKey);


    } else {
        loadingOff();
    }
loadingOff();
}


function addToFavorite(name, id){
    loadingOn();
    var remember = localStorage.getItem("remember");
    var userId;
    if(remember === "true"){
        userId = localStorage.getItem("user");
    }
    else{
        userId = sessionStorage.getItem("user");
    }


    var data = {
        "siteId" : id
    };
    var success = function (result) {
        check401(result);
        document.getElementById("rightSideDiv").innerHTML = "";

        getFavorite();
        loadingOff();

        //location.reload();
    };
    var error = function (result) {
        check401(result);
        loadingOff();
       // alert(name+ " Finns redan som favorit i din lista");
    };
    _put(usersEndpoint + "/"+userId + favouritesEndpoint, success, error, JSON.stringify(data), sessionKey);

}
function addToFavoriteFromSearch(name, id){
    loadingOn();
    var remember = localStorage.getItem("remember");
    var userId;
    if(remember === "true"){
        userId = localStorage.getItem("user");
    }
    else{
        userId = sessionStorage.getItem("user");
    }

    var data = {
        "siteId" : id
    };
    var success = function (result) {


        check401(result);
        //alert("Denna restaurang har lagts till som favorit");
        loadingOff();

        //location.reload();
    };
    var error = function (result) {
        check401(result);
        loadingOff();

        var statusCode = result["status"];


        if(statusCode == 400){
            alert("Du har redan uppnått max antal favoriter");
        }
        //alert(name+ " Finns redan som favorit i din lista");
    };
    _put(usersEndpoint + "/"+userId + favouritesEndpoint, success, error, JSON.stringify(data), sessionKey);

}


function addZeroToNumber(number){
    if(number < 10){
        number = "0"+number;
    }
    return number;
}

var currentSiteOpen;
var currentSiteOpenDelivery;
function setOpenOrClose(isOpen, open, close, text){
    var green = "#009A16";
    var red = "#EB524A";
    if(open != null && open != "" && close != null && close != ""){
        var time = open+"-"+close;
        if(isOpen == 1){
            if(open == close){
                text.innerHTML = "Öppet hela dagen";
            } else{
                text.innerHTML = "Öppet ("+time+")";
            }
            text.style.color = green;
        } else{
            if(open == close && open == "23:59"){
                text.innerHTML = "Stängt hela dagen";
                isOpen = false;
            } else{
                text.innerHTML = "Stängt ("+time+")";
            }
            text.style.color = red;
        }
    } else{
        text.innerHTML = "Stängt";
        text.style.color = red;
    }
    return isOpen;
}

function getSiteBusinessHours(siteId, callback){
    var success = function (result) {
        check401(result);
        if(result) {
            var resultsStatus = document.getElementById("resultsStatus"+siteId);
            var resultsDeliveryClosing = document.getElementById("resultsDeliveryClosing"+siteId);
            var open = "";
            if(result.open != null){
                open = result.open.substring(0, 5);
            }
            var close = "";
            if(result.close != null){
                close = result.close.substring(0, 5);
            }
            var deliveryOpen = "";
            if(result.delivery_open != null){
                deliveryOpen = result.delivery_open.substring(0, 5);
            }
            var deliveryClose = "";
            if(result.delivery_close != null){
                deliveryClose = result.delivery_close.substring(0, 5);
            }
            var isOpen = result.isopen;
            var isOpenDelivery = result.isopendelivery;
            currentSiteOpen = setOpenOrClose(isOpen, open, close, resultsStatus);
            currentSiteOpenDelivery = setOpenOrClose(isOpenDelivery, deliveryOpen, deliveryClose, resultsDeliveryClosing);
            if(callback != null){
                callback();
            }
        }
        loadingOff();
    };
    var error = function (result) {

        console.log("Something went wrong with the connection");
        loadingOff();
    };
    _get(sitesEndpoint+"/"+siteId+ businessHoursEndpoint, success, error, sessionKey);
}


/*FOOTER*/
$("#typeMessage").keyup(function(e){
    if(e.keyCode == 13){
        $("#send").click();
    }
});

function hideConditions(){
    $("#popUpWrap5").stop(true, true).fadeOut(500);
}
function showConditions() {
    $("#popUpWrap5").stop(true, true).fadeIn(500);
}

