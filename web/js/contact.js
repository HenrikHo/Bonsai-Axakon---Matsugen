/**
 * Created by henri on 2017-08-23.
 */
$(document).ready(function() {
    /*if(sessionStorage.getItem("loggedIn") === "true" || getCookie("loggedIn") === "true"){
        sessionStorage.setItem("selectedPage", "3");
    }*/
});

$(window).on("load", function () {
    getUser();
    getOrderId();
});


var loggedIn = sessionStorage.getItem("loggedIn");
var loggedInLocal = localStorage.getItem("remember");




function getUser(){
    if(loggedIn == true|| loggedInLocal == true) {
        loadingOn();
        var fullName = document.getElementById("contactName");
        var email = document.getElementById("contactEmailSender");
        var emailOrder = document.getElementById("contactEmailOrder");


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
                fullName.value = result.first_name + " " + result.last_name;
                email.value = result.email;

            }
            loadingOff();
        };
        var error = function (result) {
            check401(result);
            loadingOff();
        };
        _get(usersEndpoint + "/" + userId, success, error, sessionKey);
    }

}


function getOrderId (){
    if(loggedIn == true|| loggedInLocal == true) {
        loadingOn();

        var orderId;
        var latestOrderId = document.getElementById("contactOrderNumber");
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
            for (var i = 0; i < result.length; i++) {
                if (result[result.length - 1].id !== null) {
                    latestOrderId.value = result[result.length - 1].id;
                }
            }

            loadingOff();
        };
        var error = function (result) {
            check401(result);
            loadingOff();

        };

        _get(usersEndpoint + "/" + userId + ordersEndpoint, success, error, sessionKey);
    }
}