$(document).ready(function() {
        $("#menuSearch").keyup(function(e){
            if(e.keyCode == 13){
                $("#menuSearchBtn").click();
            }
        });


});
function whatMenuCookie() {
    var cookie = sessionStorage.getItem("selectedPage");
    var menuLinks = document.getElementsByClassName("menuLink");
    try {
        for(var i = 0; i < menuLinks.length; i++){
            menuLinks[i].style.borderBottom = "none";
        }
    } catch (e){
    } finally {
        if (cookie === "1") {
            document.getElementById("menuLink1").style.borderBottom = "#DC4405 solid 2px";
        }
        else if (cookie === "2") {
            document.getElementById("menuLink2").style.borderBottom = "#DC4405 solid 2px";
        }

        else if (cookie === "3") {
            document.getElementById("menuLink3").style.borderBottom = "#DC4405 solid 2px";
        }
        else if (cookie === "4") { //OBS DENNA LIGGER NUMERA I FOOTERN
            document.getElementById("menuLink4").style.borderBottom = "#DC4405 solid 2px";
        }
        else if (cookie === "5") { //OBS DENNA LIGGER I FOOTERN
            document.getElementById("menuLink5").style.borderBottom = "#DC4405 solid 2px";
        }
        else if (cookie === "6") { //OBS DENNA LIGGER I FOOTERN
            document.getElementById("menuLink5").style.borderBottom = "#DC4405 solid 2px";
        }
        else {
        }
    }
}