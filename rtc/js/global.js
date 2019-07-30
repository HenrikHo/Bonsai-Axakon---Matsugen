$(document).ready(function() {
    $(window).scrollTop(0);
    $.get("../rtc/includes/popups.html", function(data) {
        $("body").append(data);
    });
    $("header").css('opacity', '0');
    $("footer").css('opacity', '0');
    $(".body").css('opacity', '0');
    $.getScript("../rtc/js/includes.js", function(){
        getLocation();
    });
    loadedTimes = false;
    loadedSpecial = false;
});

$(window).on("load", function () {
    setTimeout(function(){
        $("header").stop().animate({opacity: '1'}, 500);
        $("footer").stop().animate({opacity: '1'}, 500);
    }, 1000);
});

