$(document).ready(function() {
    var events = "click tap keyup";
    $(".popUpWrap").on(events, function(e){
            if($(e.target).is(".popUpWrap")){
                e.preventDefault();
                e.stopPropagation();
                $(".popUp").parent().fadeOut(300);
            }
        }
    );

    function showPopUp(trigger, wrap){
        $(trigger).on(events, function(e){
            e.preventDefault();
            e.stopPropagation();
            $(wrap).fadeIn(300);
            $(wrap).find('input').first().focus();
        });
    }

  /*  function HidePopUp(trigger, wrap){
        $(trigger).on(events, function(e){
            e.preventDefault();
            e.stopPropagation();
            $(wrap).fadeOut(300);
            $(wrap).find('input').first().focus();
        });
    }
    HidePopUp("#conditionsBack", "#popUpWrap5");
    */

    showPopUp("#headLogIn", "#popUpWrap1");
    showPopUp("#headPageCreateAccount", "#popUpWrap2");

    showPopUp("#logInLinkTextCreateAccount", "#popUpWrap2");
    showPopUp(".conditionsClass", "#popUpWrap5");


    $("#contentWrapperLogIn").keyup(function(e){
        if(e.keyCode == 13){
            $("#acceptButton").click();
        }
    });
    $("#contentWrapperMyPage").keyup(function(e){
        if(e.keyCode == 13){
            $("#myPageRegister").click();
        }
    });
    $(document).keyup(function(e) {
        if(e.keyCode == 27) {
            e.preventDefault();
            e.stopPropagation();
            $(".popUp").parent().fadeOut(300);
        }
    });
    $(document).keydown(function(e) {
        if(e.keyCode == 9) {
            e.preventDefault();
        }
    });
    var inputs = $("input, textarea");
    var next;
    inputs.keydown(function(e) {
        if(e.keyCode == 9) {
            if(e.shiftKey) {
                next = inputs.get(inputs.index(this) - 1);
                next.focus();
            }
            else{
                next = inputs.get(inputs.index(this) + 1);
                next.focus();
            }
        }
    });
});
