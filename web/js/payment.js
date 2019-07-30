$(document).ready(function() {
    loadingOn();
    document.getElementById("paymentDeliveryCheckbox").checked = true;
    document.getElementById("paymentCardCheckbox").checked = true;
    sessionStorage.setItem("readyToOrder", "true");
    sessionStorage.setItem("selectedPage", "1");
    whatMenuCookie();

    window.onload = disableBack();                             // this code makes it so that the user is unable to back to payment page, from order cd (or any other page)
    window.onpageshow = function(evt) {
        if (event.persisted) {
            disableBack()
        }
    }
    $('#cartPayBtn').hide();
    $("#sitemenuCheckbox").hide();

    // $(window).scroll(function() {
    //     scrollCart();
    // });
});

$(window).on("load", function () {
    getRestInfo(function(){
        getCartFromFile();
        fillCheckBox();
        deliveryHide();
    });

    var status  = sessionStorage.getItem("checkBox");
    if(status == 0){
        paymentSwitchChange(0);
    } else if(status == 1){
        paymentSwitchChange(1);
    }


});



function paymentSwitchChange(type){
    var delivery = document.getElementById("paymentDeliveryCheckbox");
    var pickup = document.getElementById("paymentPickUpCheckbox");
    var card = document.getElementById("paymentCardCheckbox");
    var cash = document.getElementById("paymentCashCheckbox");
    if(type === 0){
        delivery.checked = true;
        pickup.checked = false;
        changeCheckBoxDeliveryPickUp(type);
        setCheckBoxType(type);
        addDeliveryFee();
    }
    else if(type === 1){
        delivery.checked = false;
        pickup.checked = true;
        changeCheckBoxDeliveryPickUp(type);
        setCheckBoxType(type);
        addDeliveryFee();
    }
    else if(type === 2){
        card.checked = true;
        cash.checked = false;
    }
    else if(type === 3){
        card.checked = false;
        cash.checked = true;
    }
}

function orderFinished(){
    window.location = "../web/orderCD.php";
}

function deliveryHide () {
    var deliveryWay = sessionStorage.getItem("checkBox");
    if (deliveryWay == 1) {
        $('#paymentCheckboxBody').hide();
        $('#adressTitle').hide();
        $('#myPageSecondBody').hide();
        //$('#settingsDiv').css("margin","90px auto");
    //    $('#myPageSecondBody').slideDown();
    }
    else if(deliveryWay == 0){
        $('#myPageSecondBody').show();
        $('#paymentCheckboxBody').show();
        $('#adressTitle').show();
    }
}




function disableBack(){
    window.history.forward();
}

function scrollCart() {
    var cartDiv = $('#paymentCartDiv');
    var height =  window.innerHeight;


    var footerPlace = $('#footerContainer').offset().top;
    var cartdivSomething = cartDiv.outerHeight();

    if (height < 700) {
        cartDiv.css('min-height', '590px');
        cartDiv.css('height', '590px');
        if($(document).scrollTop() > 25) {
            var newPos = $(document).scrollTop() - 10;

            cartDiv.css({top: newPos});
            if($(window).scrollTop() > (footerPlace - cartdivSomething)) {
                cartDiv.css({
                    //      position: 'absolute',
                    top: (footerPlace - cartdivSomething - 10)
                });
            }
        }
        else{
            cartDiv.css({top:0});
        }
    } else if(height > 650){
        cartDiv.css('min-height', '600px');
        cartDiv.css('height', '600px');

        if($(document).scrollTop() > 25) {
            var newPos = $(document).scrollTop() - 10;
            cartDiv.css({top: newPos});
        }
        else{
            cartDiv.css({top:0});
        }
    }
}

































