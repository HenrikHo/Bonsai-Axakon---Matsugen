$(document).ready(function() {
    $(window).scrollTop(0);
    $(".body").css('opacity', '0');
    //test

    var url_string = window.location.href;
    var url = new URL(decodeURIComponent(url_string));
    var usernameFromUrl = url.searchParams.get("id");
    var passwordFromUrl = url.searchParams.get("password");

    if(usernameFromUrl && usernameFromUrl != "" && passwordFromUrl && passwordFromUrl != ""){
        alert(usernameFromUrl + passwordFromUrl);
        logIn(usernameFromUrl, passwordFromUrl);
    }
});

$(window).on("load", function () {
    setTimeout(function(){
        $(".body").stop().animate({opacity: '1'}, 500);
    }, 100);
    $("#logInFormDiv").keyup(function(e){
        if(e.keyCode == 13){
            $("#logInBtn").click();
        }
    });
});

function newLogin(username, password){
    document.getElementById('logInBtn').disable = 'disable';
    loadingOn();
    if(!username && !password){
        username = document.getElementById('usernameTxt').value;
        password = document.getElementById('passwordTxt').value;
    }

    localStorage.setItem("userRTC", userId);
    localStorage.setItem("siteRTC", siteId);
    localStorage.setItem("keyRTC", key);
    localStorage.setItem("usernameRTC", username);
    localStorage.setItem("passwordRTC", password);
    deleteCookie("selectedPage");

    location.reload();
    loadingOff();

}


function logIn(username, password) {
    document.getElementById('logInBtn').disabled = 'disable';

    loadingOn();
    if(!username && !password){
        username = document.getElementById("usernameTxt").value;
        password = document.getElementById("passwordTxt").value;
    }
    var data = {
        id: username,
        password: password
    };

    var success = function(result) {
        document.getElementById('logInBtn').disabled = 'enable';

        var userId = (result.id);
        var siteId = (result.siteid);
        var key = result.authorization['key'];
        $.ajax({
            url: baseUrlRtc + logInPath,
            type: "POST",
            data: {
                logInId: userId
            },
            success: function(result){
                //alert("Du är inloggad");

                localStorage.setItem("userRTC", userId);
                localStorage.setItem("siteRTC", siteId);
                localStorage.setItem("keyRTC", key);
                localStorage.setItem("usernameRTC", username);
                localStorage.setItem("passwordRTC", password);
                deleteCookie("selectedPage");

                location.reload();
                loadingOff();
            },
            error: function (error) {
                loadingOff();

            }
        });
    };
    var error = function(result) {
        alert("Användarnamn eller Lösenord är felaktigt");
        loadingOff();
        document.getElementById('logInBtn').disabled = 'enable';

    };

    if(username && password) {
        _post(loginEndpoint, success, error, JSON.stringify(data));
    }
    else {
        alert("Var god fyll i användarnamn och lösenord");
        loadingOff();
    }

}