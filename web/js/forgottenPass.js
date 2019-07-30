var token;
$(document).ready(function() {
    var urlString = window.location.href;
    var url = new URL(urlString);
    token = url.searchParams.get("token");

});

$(window).on("load", function () {
    getUser();
    getOrderId();
});


function changeForgotPass(){
    loadingOn();
    var fullName = document.getElementById("contactName");
    var email = document.getElementById("contactEmailSender");
    var emailOrder = document.getElementById("contactEmailOrder");
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
            fullName.value = result.first_name + " " + result.last_name;
            email.value = result.email;

        }
        loadingOff();
    };
    var error = function(result) {
        check401(result);
        loadingOff();
    };
    _get(loginEndpoint + forgotEndpoint+"?user=", success, error, sessionKey);

}