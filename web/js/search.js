/**
 * Created by henri on 2017-08-09.
 */
$(document).ready(function() {
    loadingOn();
    sessionStorage.setItem("selectedPage", "1");
    whatMenuCookie();
});

$(window).on("load", function () {
    getAllRestaurants();
    sessionStorage.setItem("checkBox", 0);
});

var RestArray = [];


function getAllRestaurants() {
    loadingOn();

    var searchResult = JSON.parse(sessionStorage.getItem("searchResult"));
    if(searchResult != null){

        $("#resultNoMatch").stop(true, true).fadeOut(500);
        document.getElementById("resultObjId").innerHTML = "";



        for (var i = 0; i < searchResult.length; i++) {
            var logoUrl = searchResult[i].logo;
            var logo = 'img/Matsugen_symbol_Gray.png';
            if(logoUrl != null || logoUrl != undefined){
                logo = "../static/logos/"+logoUrl;
            }
            var restMenuLink = "restMenuLink" + i;
            document.getElementById("resultObjId").innerHTML +=
                "<div class='resultsObj' id='resultsObj"+searchResult[i].id+"'>" +
                "<div class='resultsUpperWrap'>" +
                "<div class='resultsObjLogo'>" +
                "<a class='restLogoLink' href='../web/sitemenu.php' onclick='redirectToRestaurant("+searchResult[i].id+")'>" +
                "<img class='logoImg' onerror='imageError(this)' id='restLogoImg"+i+"' src='"+logo+"'>" +
                "</a>" +
                "</div>" +
                "<div class='resultsObjInfo'>" +
                "<p class='resultsName'>" + searchResult[i].name + "</p>" +
                "<p class='resultsAddress'>" + searchResult[i].address.street + "</p>" +
                "<p class='resultsMinOrder'>" + 'Minsta beställningen: ' + searchResult[i].min_delivery_amount+ " kr" + "</p>" +
                "<p class='resultsDeliveryPrice'>" + 'Utkörning: '+ searchResult[i].delivery_fee + " kr" +  "</p>" +
                "</div>" +
                "<div class='resultsUpperRightDiv'>" +
                "<div class='resultsObjRating'>" +
                'RATING 5/5' +
                "</div>" +
                "<a class='resultsMenuLink' id='"+ restMenuLink+ "' href='../web/sitemenu.php' onclick='redirectToRestaurant("+searchResult[i].id+")'>Visa meny</a>" +
                "<a class='resultsMenuLink' onclick='addToFavoriteFromSearch(\""+searchResult[i].name+ "\",\""+searchResult[i].id+ "\")'>Favorisera!</a>"+
                "</div>" +
                "</div>" +
                "<div class='resultsObjOpenTime'>" +
                    "<div>" +
                        "<p>Avhämtning: </p>" +
                        "<p class='resultsStatus' id='resultsStatus"+searchResult[i].id+"'></p>" +
                    "</div>" +
                    "<div>" +
                        "<p>Utkörning: </p>" +
                        "<p class='resultsDeliveryClosing' id='resultsDeliveryClosing"+searchResult[i].id+"'></p>" +
                    "</div>" +
                "</div>" +
                "</div>";
            getSiteBusinessHours(searchResult[i].id);
            displayCategories(searchResult[i].id);
            //checkOpen(restMenuLink);



        }
        $("#resultObjId").stop(true, true).fadeIn(500);
    }
    else{
        $("#resultNoMatch").stop(true, true).fadeIn(500).css('display', 'flex');
        $("#resultObjId").stop(true, true).fadeOut(500);
    }
    if(sessionStorage.getItem("searchResult") != null){
       //sessionStorage.removeItem("searchResult");
    }
}

var categoriesArray = [];
var restArray = [];
var categoriesArrayForCb = [];
var newCategoryArray = [];

function displayCategories(restaurantId) {

        var success = function (result) {

            if(result) {
                for (var i = 0; i < result.length; i++) {
                    restArray.push(result[i].name);
                    if (categoriesArray.includes(result[i].id)) {

                    }else{
                        categoriesArray.push(result[i].id);

                        //console.dir(categoriesArray);
                        document.getElementById("categoryObjJs").innerHTML +=
                            "<div class='categoryObj'>" +
                            "<label>" +
                            "<div class='checkbox'>" +
                            "<input type='checkbox' class='categoryCb' id='cb" + restaurantId + i + "' onclick='checkboxClick(this); checkboxes(\"" + result[i].id + "\",\"" + restaurantId + i + "\")'>" +
                            "</div>" +
                            "</label>" +
                            "<label class='checkboxTxt' id='labelForCb" + restaurantId + i + "' for='cb" + restaurantId + i + "'>" + restArray[i] + "</label>" +
                            "</div>" + "<br>";
                        categoriesArrayForCb.push(i);

                    }

                }
            }

            var obj = {};
            obj["restId"] = restaurantId;
            obj["content"] = restArray;
            newCategoryArray.push(obj);

            restArray = [];
        };

        var error = function (result) {

            console.log("Something went wrong with the connection");
            loadingOff();
            //console.log(result);
        };
        _get(sitesEndpoint + "/" + restaurantId + "/categories", success, error, sessionKey); // OBS!!!
}

var checkedIdArray = [];
var checkedArray = [];
function checkboxes(categoryId, id){
    var checkbox = document.getElementById("cb"+id);
    if(checkbox.checked){

        checkedArray.push(categoryId);
        checkedIdArray.push(id);

    } else if (!checkbox.checked){
        for(var i = 0; i < checkedArray.length; i++){
            if(checkedArray[i] == categoryId){
                checkedArray.splice(i, 1);
                checkedIdArray.splice(i, 1);
            }
        }
        if(checkedArray.length == 0){
            $(".resultsObj").stop(true, true).fadeIn(500);
        }
    }
    var success = function (result) {
        check401(result);
        var categoryResult = result["result"];
        $(".resultsObj").stop(true, true).fadeOut(500);
        for(var i = 0; i < categoryResult.length; i++) {
            //showThis.push(categoryResult[i].id);
            $("#resultsObj" + categoryResult[i].id).stop(true, true).fadeIn(500);
        }

    };

    var error = function (result) {
       check401(result);
        console.log("Something went wrong with the connection");
    };
    var categoryQuery = "";
    try{
        for(var y = 0; y < checkedArray.length; y++){

            if(categoryQuery == ""){
                categoryQuery = checkedArray[y];
            } else{
                categoryQuery = categoryQuery +", "+checkedArray[y].toString();
            }

        }
    } catch(e){

    } finally {
        _get(sitesEndpoint + "?categories=" + "["+categoryQuery.toString()+"]", success, error, sessionKey);
    }
}


function clearCategory(){
    //document.getElementsByClassName("checkbox").checked = true;'
    for(var i = 0; i < checkedIdArray.length; i++) {
        document.getElementById("cb"+checkedIdArray[i]).checked = false;
        document.getElementById("cb"+checkedIdArray[i]).parentNode.style.backgroundColor = "transparent";
        //console.dir(document.getElementById("cb"+i).checked);
        $(".resultsObj").stop(true, true).fadeIn(500);
    }
}

function checkOpen(id){

    var rndNumber = Math.floor(Math.random()* 10 +1);
    var link = document.getElementById(id);
    if (rndNumber > 5){
        link.style.color = '#009A16';  // '#009A16'
    }
    else{
        link.style.color = '#DC4405'; //#DC4405
    }
}


function sortPopularity() {
    $(".filterA").attr({style : ""});
    var popularity = document.getElementById("popularity").innerHTML;
    document.getElementById("popularity").style.color = "#DC4405" ;
    document.getElementById("popularity").style.fontFamily = "pantonheavy";
    document.getElementById("popularity").style.fontWeight = "light";
}
function sortAvg() {
    $(".filterA").attr({style : ""});
    var avgScore = document.getElementById("avgScore").innerHTML;

    document.getElementById("avgScore").style.color = "#DC4405" ;
    document.getElementById("avgScore").style.fontFamily = "pantonheavy";
    document.getElementById("avgScore").style.fontWeight = "light";}

function sortReviews() {
    $(".filterA").attr({style : ""});
    var reviews = document.getElementById("reviews").innerHTML;
    document.getElementById("reviews").style.color = "#DC4405" ;
    document.getElementById("reviews").style.fontFamily = "pantonheavy";
    document.getElementById("reviews").style.fontWeight = "light";


}
function sortName() {
    $(".filterA").attr({style : ""});
    var sortByName = document.getElementById("name").innerHTML;
    document.getElementById("name").style.color = "#DC4405";
    document.getElementById("name").style.fontFamily = "pantonheavy";
    document.getElementById("name").style.fontWeight = "light";
}



/*
function checkLogo (url){
    alert(url);
    var testLogo = new Image();
    testLogo.onload = loadImage;
    testLogo.onerror = errorImage();
    testLogo.src= url;

}

function errorImage(){
    alert("nej");
    alert("image not found");
    console.dir(logo);
}

function loadImage(){
    alert("hej");

    logo = url;
    alert("image found")
}




*/
















