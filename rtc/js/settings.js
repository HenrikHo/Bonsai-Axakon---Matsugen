$(document).ready(function() {
    getRestaurantFeeInfo();
});

$(window).on("load", function () {

});
/*
function getSiteAds() {
    loadingOn();
    var sessionKey = localStorage.getItem("key");
    var id = localStorage.getItem("siteRTC");
    var success = function(result){
        try{
            for(var i = 0; i< result.length; i++){
                document.getElementById("categoriesListFood").innerHTML +=
                    "<li class='adsObj'>" +
                        "<label>" +
                            "<div class='checkbox' id='"+result[i].id+"'>" +
                            "<input type='checkbox' class='categoryCb' id='cb" + result[i].id + "' onclick='checkboxId("+result[i].id+")'>" +
                            "</div>" +
                        "</label>" +
                        "<label class='checkboxTxt' for='cb" + result[i].id + "'>" + result[i].name+ "</label>" +
                    "</li>" + "<br>";
            }
        } catch(e){
        } finally{
            loadingOff();
        }
    };
    var error = function(result){
        alert("Någonting blev tyvärr fel...");
    };
    _get(sitesEndpoint+"/"+id+"/categories", success2, error, "hasse_dev_key");
}
*/
function getSiteCategories(callback){
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var id = localStorage.getItem("siteRTC");
    checkedCheckboxesArray = [];
    var currentCats;
    var success = function(result){

        try{
            for(var i = 0; i< result.length; i++){
                document.getElementById("categoriesListFood").innerHTML +=
                    "<div class='categoryObj'>" +
                    "<label>" +
                    "<div class='checkbox' id='"+result[i].id+"'>" +
                    "<input type='checkbox' class='categoryCb' id='cb" + result[i].id + "' onclick='checkboxId("+result[i].id+")'>" +
                    "</div>" +
                    "</label>" +
                    "<label class='checkboxTxt' for='cb" + result[i].id + "'>" + result[i].name+ "</label>" +
                    "</div>" + "<br>";
            }
        } catch(e){
        } finally{
            for(var i = 0; i < currentCats.length; i++){
                var checkbox = document.getElementById("cb"+currentCats[i].id);
                checkbox.checked = true;
                checkboxId(currentCats[i].id.toString());
            }
            if(callback != null){
                callback();
            }
            loadingOff();
        }
    };
    var success2 = function(result){
        try{
            currentCats = result;
        } catch(e){
        } finally{
            _get("/admin/categories", success, error, sessionKey);
        }
    };
    var error = function(result){
        alert("Någonting blev tyvärr fel...");
    };
    _get(sitesEndpoint+"/"+id+"/categories", success2, error, sessionKey);
}

function changeCategories(){
    loadingOn();
    var sessionKey = localStorage.getItem("key");
    var id = localStorage.getItem("siteRTC");
    var data = [];
    for(var i = 0; i < checkedCheckboxesArray.length; i++){
        data.push(checkedCheckboxesArray[i]);
    }
    var success = function(){
        document.getElementById("categoriesListFood").innerHTML ="";
        getSiteCategories();
    };
    var error = function(){
        alert("Någonting blev tyvärr fel...");
    };
    _post(sitesEndpoint+"/"+id+"/categories", success, error, JSON.stringify(data), sessionKey);
}

function getRestaurantFeeInfo(){
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var id = localStorage.getItem("siteRTC");
    var success = function (result) {
    //console.dir(result);
      document.getElementById("deliveryFee").value = result.delivery_fee;
      document.getElementById("min_delivery_fee").value = result.min_delivery_amount;
      document.getElementById("freeDelivery").value = result.free_delivery;
        loadingOff();
    };
    var error = function (result) {
        loadingOff();
    };
    _get(sitesEndpoint + "/"+id , success, error, sessionKey);
}

function changeFees(){
    loadingOn();

    var sessionKey = localStorage.getItem("keyRTC");
    var id = localStorage.getItem("siteRTC");

    var deliveryFee = document.getElementById("deliveryFee").value;
    var min_delivery_fee = document.getElementById("min_delivery_fee").value;
    var freeDelivery = document.getElementById("freeDelivery").value;

    var data = {
        delivery_fee: deliveryFee,
        min_delivery_amount: min_delivery_fee,
        free_delivery: freeDelivery
    };
    var success = function (result){
        //console.dir("nailedIt");
        loadingOff();
    };
    var error = function (result){
        loadingOff();
    };

    //console.dir(min_delivery_fee + " " +min_order_fee+  " "+ freeDelivery );
    _post(sitesEndpoint + "/" + id + "/deliveryfees", success, error, JSON.stringify(data), sessionKey)
}