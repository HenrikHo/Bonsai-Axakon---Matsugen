var sessionKey;
$(document).ready(function() {
    $(window).scrollTop(0);
    /*$("header").css('opacity', '0');
    $("footer").css('opacity', '0');
    $(".body").css('opacity', '0');*/
    $.getScript("../web/js/includes.js", function(){
        //getLocation();
    });


    checkLogIn();


    if(localStorage.getItem("remember") == "true" && localStorage.getItem("key") != null){
        sessionKey = localStorage.getItem("key");
    } else if(sessionStorage.getItem("loggedIn") == "true" && sessionStorage.getItem("key") != null){
        sessionKey = sessionStorage.getItem("key");
    } else{
        sessionStorage.setItem("anonLoggedIn", "true");
        sessionKey = globalAnonKey;
    }



});

$(window).on("load", function () {
    setTimeout(function(){
        $(".body").stop(true, true).animate({opacity: '1'}, 500);
        $("header").stop(true, true).animate({opacity: '1'}, 500);
        $("footer").stop(true, true).animate({opacity: '1'}, 500);
    }, 300);
});

function checkLogIn(){
    var loggedInCookie = getCookie("loggedIn");
    var loggedInSession = sessionStorage.getItem("loggedIn");
    var remember = localStorage.getItem("remember");
    if(loggedInSession == "true" || remember == "true"){
        sessionStorage.setItem("anonLoggedIn", "false");
    }
    var anonLoggedInSession = sessionStorage.getItem("anonLoggedIn"); // OBS dena bör "läggas" in!
    if(loggedInCookie != "true" && remember == "true") { //OBS
        //alert("loggedIn !== true || remember === true");
        var email = localStorage.getItem("email");
        var pw = localStorage.getItem("password");
        logIn(email, pw);
    } else if(loggedInCookie != "true" && loggedInSession != "true" && anonLoggedInSession != "true"){
        //alert("check Logged In");
        $.ajax({
            url: baseUrlWeb + logInPath,
            type: "POST",
            data: {
                logOut: "logOut"
            },
            success: function(result){
                sessionStorage.setItem("loggedIn", "false");
                location.reload();
            },
            error: function (error) {
            }
        });
    }
}

function check401(status){
    var statusCode = status["status"];

    if(statusCode == 401){
        logOut();
    }
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}