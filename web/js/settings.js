$(document).ready(function() {
    loadingOn();
   if(sessionStorage.getItem("loggedIn") == "true" || getCookie("loggedIn") == "true"){
        sessionStorage.setItem("selectedPage", "3");
        whatMenuCookie();
    }
});

$(window).on("load", function () {
    setTimeout(getUser, 100);
});


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

function getUser(){
    loadingOn();
    var firstName = document.getElementById("myPageFirstName");
    var lastName = document.getElementById("myPageSurName");
    var email = document.getElementById("myPageEmail");
    var phone = document.getElementById("myPagePhoneNumber");
    var street = document.getElementById("myPageAddress");
    var postCode = document.getElementById("myPagePostCode");
    var city = document.getElementById("myPageCity");
    var apNr = document.getElementById("myPageApNr");
    var floor = document.getElementById("myPageFloor");
    var doorCode = document.getElementById("myPageDoorCode");
    var otherInfo = document.getElementById("myPageOtherInfo");

    var userId = sessionStorage.getItem("user");
    //alert(userId);
    var remember = localStorage.getItem("remember");
    var userId;
    if(remember === "true"){
        userId = localStorage.getItem("user");
    }
    else{
        userId = sessionStorage.getItem("user");
    }

    var success = function(result) {
        check401(result);
        if(result){
            firstName.value = result.first_name;
            lastName.value = result.last_name;
            email.value = result.email;
            phone.value = result.phonenumber;
            street.value = result.address.street;
            postCode.value = result.address.area_code;
            city.value = result.address.city;
            //apNr.value = result.address. whatever variable; OBS!
            floor.value = result.address.floor;
            doorCode.value = result.address.access_code;
            apNr.value = result.address.apartment_number;
            //otherInfo.value = result.address. whatever variable; OBS!

        }
        loadingOff();
    };
    var error = function(result) {
        check401(result);
        loadingOff();
    };

    _get(usersEndpoint + "/"+userId, success, error, sessionKey);
}

function changeUser(){
    loadingOn();
    checkLogIn();
    var firstName = document.getElementById("myPageFirstName").value;
    var lastName = document.getElementById("myPageSurName").value;
    var phoneNumber = document.getElementById("myPagePhoneNumber").value;
    var street = document.getElementById("myPageAddress").value;
    var postCode = document.getElementById("myPagePostCode").value;
    var city = document.getElementById("myPageCity").value;
    var apNr = document.getElementById("myPageApNr").value;
    var floor = document.getElementById("myPageFloor").value;
    var doorCode = document.getElementById("myPageDoorCode").value;
    var otherInfo = document.getElementById("myPageOtherInfo").value;
    var remember = localStorage.getItem("remember");
    var userId;
    if(remember === "true"){
        userId = localStorage.getItem("user");
    }
    else{
        userId = sessionStorage.getItem("user");
    }

    var data = {
        "phonenumber": phoneNumber,
        "first_name": firstName,
        "last_name": lastName,
        "address": {
            "street": street,
            "city": city,
            "area_code": postCode,
            "apartment_number": apNr,
            "floor": floor,
            "access_code": doorCode
        },
        "other_info": otherInfo
    };
        var success = function(result) {
            check401(result);
            //alert(JSON.stringify(result));
            loadingOff();
        };
        var error = function(result) {
            check401(result);
            loadingOff();

        };

    _patch(usersEndpoint + "/"+userId, success, error, JSON.stringify(data), sessionKey);

}

function changePass(){
    loadingOn();
    var remember = localStorage.getItem("remember");
    var userId;
    if(remember == "true"){
        userId = localStorage.getItem("user");
    } else{
        userId = sessionStorage.getItem("user");
    }
    var currPass;
    if(localStorage.getItem("remember") == "true"){
        currPass = localStorage.getItem("password");
    } else{
        currPass = sessionStorage.getItem("password");
    }
    var currentPassCheck = document.getElementById("currentPassword").value;
    var newPass= document.getElementById("newPassword").value;
        if(currentPassCheck == currPass){
        var data = {
            "password" : currPass,
            "new_password" : newPass
        };
        var success = function(result) {
            check401(result);
            //alert(JSON.stringify(result));
            if(localStorage.getItem("remember") === "true"){
                currPass = localStorage.setItem("password", newPass);
            } else{
                currPass = sessionStorage.setItem("password", newPass);
            }
            alert("Ditt lösenord är nu ändrat");
            document.getElementById("currentPassword").value = "";
            document.getElementById("newPassword").value = "";
            loadingOff();
        };
        var error = function(result) {
            check401(result);
            loadingOff();
        };
        if(currPass && newPass){
            //alert("Allt är nästan i sin ordning! Vi ska bara fixa lite grejer, var god försök om en stund ingen!");
            _patch(usersEndpoint + "/"+userId, success, error, JSON.stringify(data), sessionKey);

        } else if(!currPass || !newPass){
            alert("Var god och fyll i alla fält!");
            loadingOff();
        }
    } else {
            loadingOff();

            alert("Ditt nuvarande lösenord stämmer inte med det du precis skrivit, var snäll och försök igen!");
        }
}

