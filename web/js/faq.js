/**
 * Created by henri on 2017-09-14.
 */
var idQuestion;

$(document).ready(function() {
    $(".faqQuestion").click(function(event) {
      //  alert(event.target.id);
        idQuestion = event.target.id;
        openQuestions();
    });
});

$(window).on("load", function () {
});

$("#popUpWrapLoader").stop(true, true).fadeIn(500);
var faqArray =[];

function openQuestions(){


    var id = idQuestion.slice(1);

        if (faqArray[0] != id){
            $('.faqAnswer').hide();
            faqArray[0] = id;
            $('#a'+id).fadeIn(500);
        }else{
            $('.faqAnswer').fadeOut(500);
            faqArray =[];
        }


 //   $('.faqAnswer').attr({style : ""});

}