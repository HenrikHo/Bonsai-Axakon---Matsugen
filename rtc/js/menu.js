$(document).ready(function() {
    if(!getCookie("selectedPage")){
        setSelectedMenuLink("1");
    }
    else {
        setSelectedMenuLink(getCookie("selectedPage"));
    }
});

$(window).on("load", function () {

    
    poll = setInterval(pollOrders,15000);


});
function setSelectedMenuLink(link) {
    loadingOff();
    $("#homeBody").stop(true, true).css('opacity', '0');
        document.getElementById("menuLink"+link).style.backgroundColor = "#DC4405";
        document.getElementById("menuLinkTxt"+link).style.color = "white";

    for(var i = 1; i < 6; i++){
        if(i != link){

                document.getElementById("menuLink"+ i).style.backgroundColor = "#F8EBDC";
                document.getElementById("menuLinkTxt" + i).style.color = "#DC4405";

        }
    }
    setCookie("selectedPage", link);
    if(link == "1"){
        loadingOn();
        $("#homeBody").load("../rtc/orders.php", function () {
            $("#homeBody").stop(true, true).animate({opacity: '1'}, 500);
            getOrders(function () {
                $("#ordersList").stop(true, true).animate({opacity: '1'}, 500);
                loadingOff();
            });
        });
    }
    else if(link == "2"){
        loadingOn();
        $("#homeBody").load("../rtc/cars.php", function () {
            $("#homeBody").stop(true, true).animate({opacity: '1'}, 500);
            getCars(function () {
                $("#carsWrap").stop(true, true).animate({opacity: '1'}, 500);
                loadingOff();
            });
        });
    }
    else if(link == "3"){
        $("#homeBody").load("../rtc/map.php", function () {
            $("#homeBody").stop(true, true).animate({opacity: '1'}, 500);

        });
    }
    else if(link == "4"){
        loadingOn();
        $("#homeBody").load("../rtc/history.php", function () {
            $("#homeBody").stop(true, true).animate({opacity: '1'}, 500);
            getHistory(function(){
                $('#historyWrap').stop(true, true).animate({opacity: '1'},500);
                loadingOff();
            });
        });
    }
    else if(link == "5"){
        loadingOn();
        $("#homeBody").load("../rtc/settings.php", function () {
            $("#homeBody").stop(true, true).animate({opacity: '1'}, 500);
            getSiteCategories(function(){
                $('#settingsWrap').stop(true, true).animate({opacity: '1'},500);
                loadingOff();
            });
        });
    }
}
