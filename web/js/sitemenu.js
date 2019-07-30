$(document).ready(function() {
    loadingOn();
    sessionStorage.setItem("readyToOrder", "false");
    sessionStorage.setItem("selectedPage", "1");
    whatMenuCookie();

    $(window).scroll(function() {
        scrollCart();
    });

    //
    // $(window).resize(function() {
    //     checkWindowHeight();
    // });
    //
});

$(window).on("load", function () {
    getRestInfo(function(){
        getCartFromFile();
        getRestaurant();
        getMenu();
        fillCheckBox();
    });
});
var departmentsArray = [];
function getMenu() {
    loadingOn();
    var restaurantId = sessionStorage.getItem("restaurantId");
    var success = function(result) {
        check401(result);
        try{
            var sitemenuTable = document.getElementById("sitemenuTable");
            var categoryObjJs = document.getElementById("categoryObjJs");
            var departmentIndex = -1;
            if(result){
                for(var i = 0; i < result.length; i++){
                    var group = result[i];
                    var departments = group.departments;
                    for(var x = 0; x < departments.length; x++){
                        departmentIndex++;

                        var department = departments[x];
                        var departmentName = department.name;
                        var departmentId = department.id;
                        var departmentPlus = department.plus;
                        var departmentModifiers = department.modifiers;

                        /*
                         var obj = {};
                         obj["id"] = departmentId;
                         obj["name"] = departmentName;
                         */


                        var sitemenuCategoryTitleClass = "";
                        if(i == 0 && x == 0){
                            sitemenuCategoryTitleClass = "sitemenuCategoryTitleFirst"
                        } else {
                            sitemenuCategoryTitleClass = "sitemenuCategoryTitle"
                        }
                        sitemenuTable.innerHTML +=
                            "<li class='siteMenuCategoryItem txt14' id='siteMenuCategoryItem" + departmentIndex + "' >" +
                            "<div class='"+sitemenuCategoryTitleClass+"'>" +
                            "<p>" + departmentName + "</p>" +
                            "</div>" +
                            "<ul class='resizePadding' id='" + departmentName + departmentIndex + "'>" +
                            "</ul>" +
                            "</li>";
                        categoryObjJs.innerHTML +=
                            "<div class='categoryObj'>" +
                            "<label>" +
                            "<div class='checkbox'>" +
                            "<input type='checkbox' class='categoryCb' id='cb" + departmentIndex + "' onclick='checkboxClick(this); checkboxes(\"" + departmentIndex + "\")'>" +
                            "</div>" +
                            "</label>" +
                            "<label class='checkboxTxt' for='cb" + departmentIndex + "'>" + departmentName + "</label>" +
                            "</div>";

                        departmentsArray.push(departmentIndex);

                        var modifiersPopUpTarget = document.getElementById("sitemenuTable");

                        for(var y = 0; y < departmentPlus.length; y++){
                            var product = departmentPlus[y];
                            var productName = product.name;
                            var productPrice = product.price;
                            var productId = product.id;
                            var productDescription;

                            if(product.description && product.description != ""){
                                productDescription = product.description;
                            }
                            else if(!product.description || product.description == "") {
                                productDescription = "";
                            }

                            var categoryProductList =  document.getElementById(departmentName + departmentIndex);
                            if(currentSiteOpen == 1 || currentSiteOpenDelivery == 1){
                                if(departmentModifiers && departmentModifiers.length > 0){
                                    categoryProductList.innerHTML +=
                                        "<li class='sitemenuProductItem txt14'>" +
                                        "<div class='sitemenuProductInfo'>" +
                                        "<div class='sitemenuProductItemSectionFirst'>" +
                                        "<p class='sitemenuProductName txt16' id='name"+productId+"'>"+ productName +"</p>"+
                                        "<p class='sitemenuProductDescription' id='productDescription"+productId+"'>"+ productDescription +"</p>"+
                                        "</div>" +
                                        "<div class='sitemenuProductItemSectionLast'>" +
                                        "<p class='sitemenuProductPrice' id='price"+productId+"'>"+ productPrice + "kr</p>"+
                                        "<button class='sitemenuProductButton' onclick='makeProduct(\""+productName+ "\",\""+productPrice+ "\",\""+productId+"\",\"false\")'>LÄGG TILL</button>"+
                                        "<p class='sitemenuOpenModifiers' id='changeModifiers"+productId+"' onclick='openModifiersPopUp(\""+productId+"\"); makeProduct(\""+productName+ "\",\""+productPrice+ "\",\""+productId+"\",\"true\")'>ÄNDRA</p>"+
                                        "</div>" +
                                        "</div>" +
                                        "</li>";
                                } else{
                                    categoryProductList.innerHTML +=
                                        "<li class='sitemenuProductItem txt14'>" +
                                        "<div class='sitemenuProductInfo'>" +
                                        "<div class='sitemenuProductItemSectionFirst'>" +
                                        "<p class='sitemenuProductName txt16' id='name"+productId+"'>"+ productName +"</p>"+
                                        "<p class='sitemenuProductDescription' id='productDescription"+productId+"'>"+ productDescription +"</p>"+
                                        "</div>" +
                                        "<div class='sitemenuProductItemSectionLast'>" +
                                        "<p class='sitemenuProductPrice' id='price"+productId+"'>"+ productPrice + "kr</p>"+
                                        "<button class='sitemenuProductButton' onclick='makeProduct(\""+productName+ "\",\""+productPrice+ "\",\""+productId+"\",\"false\")'>LÄGG TILL</button>"+
                                        "<p class='sitemenuOpenModifiers'></p>"+
                                        "</div>" +
                                        "</div>" +
                                        "</li>";
                                }
                            } else{
                                categoryProductList.innerHTML +=
                                    "<li class='sitemenuProductItem txt14'>" +
                                    "<div class='sitemenuProductInfo'>" +
                                    "<div class='sitemenuProductItemSectionFirst'>" +
                                    "<p class='sitemenuProductName txt16' id='name"+productId+"'>"+ productName +"</p>"+
                                    "<p class='sitemenuProductDescription' id='productDescription"+productId+"'>"+ productDescription +"</p>"+
                                    "</div>" +
                                    "<div class='sitemenuProductItemSectionLast'>" +
                                    "<p class='sitemenuProductPrice' id='price"+productId+"'>"+ productPrice + "kr</p>"+
                                    "<p class='sitemenuOpenModifiers'></p>"+
                                    "</div>" +
                                    "</div>" +
                                    "</li>";
                            }


                            if(productDescription == ""){
                                var desc = document.getElementById("productDescription"+productId);
                                desc.style.display = "none";
                            }

                            modifiersPopUpTarget.innerHTML +=
                                "<div class='modifiersPopUp' id='modifiersPopUp"+productId+"'>"+
                                "<div class='popUp modifiersPopUpWrapper'>"+
                                "<div class='modifiersPopUpTop'>"+
                                "<p class='modifierPopUpTitle txt20'>Modifiera produkten</p>"+
                                "</div>"+
                                "<div class='modifiersPopUpMiddle'>"+
                                "<ul class='modifiersPopUpList' id='modifiersPopUpList"+productId+"'>"+
                                "</ul>"+
                                "</div>"+
                                "<div class='modifiersPopUpBottom'>"+
                                "<p class='modifierPopUpClose' onclick='closeModifiersPopUp(\""+productId+"\")'>Avbryt</p>"+
                                "<button class='sitemenuProductButton' onclick='addModifiedProductToCart(\""+productId+"\")'>LÄGG TILL</button>"+
                                "</div>"+
                                "</div>"+
                                "</div>";

                            var productModifierList =  document.getElementById("modifiersPopUpList" + productId);
                            if(departmentModifiers){
                                for(var z = 0; z < departmentModifiers.length; z++){
                                    var modifier = departmentModifiers[z];
                                    var modifierName = modifier.name;
                                    var modifierPrice = modifier.price;
                                    var modifierId = modifier.id;

                                    productModifierList.innerHTML +=
                                        "<li>" +
                                        "<div class='sitemenuProductItemSectionFirst'>" +
                                        "<p class='sitemenuMenuNameOfFood txt14' id='modifierName"+productId+modifierId+"'>"+ modifierName +"</p>"+
                                        "</div>" +
                                        "<div class='sitemenuProductItemSectionLast'>" +
                                        "<p id='modifierPrice"+productId+modifierId+"' class='sitemenuProductPrice'>" + modifierPrice + "kr"+"</p>" +
                                        "<label>" +
                                        "<div class='checkbox'>" +
                                        "<input type='checkbox' class='categoryCb' id='modifierCb"+productId+modifierId+ "' onclick='checkboxClick(this); modifierCheckBox(this, \""+modifierName+ "\",\""+modifierPrice+ "\",\""+modifierId+"\")'>" +
                                        "</div>" +
                                        "</label>" +
                                        "</div>" +
                                        "</li>";
                                }
                            }
                        }
                    }
                }
            }
            else{

            }
        } catch(e){

        } finally {
            loadingOff();
        }
    };
    var error = function(result) {
        check401(result);
        loadingOff();
    };
    _get(sitesEndpoint+ "/"+restaurantId + productsEndpoint, success, error, sessionKey);
}

function openModifiersPopUp(productId) {
    $("#modifiersPopUp"+productId).stop(true, true).fadeIn(500);
}

function closeModifiersPopUp(productId) {
    $("#modifiersPopUp"+productId).stop(true, true).fadeOut(500);
    try {
        for(var i = 0; i < currentModifiers.length; i++){
            var modId = currentModifiers[i].product_id;
            document.getElementById("modifierCb"+productId+modId).checked = false;
            document.getElementById("modifierCb"+productId+modId).parentNode.style.backgroundColor = "transparent";

        }
    }catch (e){
    } finally {
        currentModifiers = [];
    }
}




function getRestaurant() {
    loadingOn();
    var restaurantId = sessionStorage.getItem("restaurantId");
    var success = function (result) {
        check401(result);
        document.getElementById("topOfBody").innerHTML = "";

        if(result != null){

            if(result.logo != null || result.logo != undefined){
                var val = result.logo;
                if(imageExist(val) != 0){
                    $('#restLogoImg').attr("src", val);
                }
            }

            logo = 'img/Matsugen_symbol_Gray.png';


            document.getElementById("topOfBody").innerHTML =
                    "<div class='resultsObj'>" +
                    "<div class='resultsUpperWrap'>" +
                    "<div class='resultsObjLogo'>" +
                    "<img class='logoImg' onerror='imageError(this)' id='restLogoImg' src='" + logo + "'>" +
                    "</div>" +
                    "<div class='resultsObjInfo'>" +
                    "<p class='resultsName'>" + result.name + "</p>" +
                    "<p class='resultsAddress'>" + result.address.street + "</p>" +
                    "<p class='resultsMinOrder'>" + 'Minsta beställningen: '+ result.min_delivery_amount+'kr' + "</p>" +
                    "<p class='resultsDeliveryPrice'>" + 'Utkörning: '+result.delivery_fee +'kr' + "</p>" +
                    "</div>" +
                    "<div class='resultsUpperRightDiv'>" +
                    "<div class='resultsObjRating'>" +
                    'RATING 5/5' +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='resultsObjOpenTime'>" +
                        "<div>" +
                        "<p>Avhämtning: </p>" +
                        "<p class='resultsStatus' id='resultsStatus"+result.id+"'></p>" +
                        "</div>" +
                        "<div>" +
                        "<p>Utkörning: </p>" +
                        "<p class='resultsDeliveryClosing' id='resultsDeliveryClosing"+result.id+"'></p>" +
                        "</div>" +
                    "</div>" +
                    "</div>";
        }
        getSiteBusinessHours(result.id, function () {
            if(currentSiteOpen == false && currentSiteOpenDelivery == false){
                $("#sitemenuCartDiv").attr('style', 'visibility: hidden !important');
                alert("Den här restaurangen har stängt för tillfället.\nDu kan fortfarande se menyn, men du kan tyvärr inte beställa något \nKom gärna tillbaka lite senare!");
            }
        });
    loadingOff();
    };
    var error = function (result) {
        check401(result);
        console.log("Something went wrong with the connection");
        loadingOff();
    };
    _get(sitesEndpoint + "/"+restaurantId , success, error, sessionKey);
}

var checkedArray = [];
function checkboxes(index){
    var checkbox = document.getElementById("cb"+index);
    if(checkbox.checked){
        if(checkedArray.length == 0){
            $(".siteMenuCategoryItem").stop(true, true).fadeOut(500);
        }
        $("#siteMenuCategoryItem" + index).stop(true, true).fadeIn(500);
        checkedArray.push(index);
    } else if (!checkbox.checked){
        $("#siteMenuCategoryItem" + index).stop(true, true).fadeOut(500);
        for(var i = 0; i < checkedArray.length; i++){
            if(checkedArray[i] == index){
                checkedArray.splice(i, 1);
            }
        }
        if(checkedArray.length == 0){
            $(".siteMenuCategoryItem").stop(true, true).fadeIn(500);
        }
    }
}

function clearCategory(){
    for(var i = 0; i < departmentsArray.length; i++){
        document.getElementById("cb"+i).checked = false;
        document.getElementById("cb"+i).parentNode.style.backgroundColor = "transparent";
        checkedArray = [];
    }
    $(".siteMenuCategoryItem").stop(true, true).fadeIn(500);
}


function checkOpen(){

    var openTime; // this will be the time when the site is open.asdasd
    var currentTime = new Date();
    var nowDay = currentTime.getDay();
    var nowHours = currentTime.getHours();
    var nowMinutes = currentTime.getMinutes();
    var nowSeconds = currentTime.getSeconds();

}



function scrollCart() {
    var height =  window.innerHeight;
    var cartDiv = $('#sitemenuCartDiv');


    var footerPlace = $('#footerContainer').offset().top;
    var cartdivSomething = cartDiv.outerHeight();

    if (height < 700) {
        if($(document).scrollTop() > 400) {
            var newPos = $(document).scrollTop() - 300;

            cartDiv.css({top: newPos});
            if($(window).scrollTop() > (footerPlace - cartdivSomething)) {
                cartDiv.css({
              //      position: 'absolute',
                    top: (footerPlace - cartdivSomething - 325)
                });
            }
        }
        else{
            cartDiv.css({top:0});
        }
    } else if(height > 650){

        if($(document).scrollTop() > 400) {
                var newPos = $(document).scrollTop() - 250;
                cartDiv.css({top: newPos});
        }
        else{
            cartDiv.css({top:0});
        }
    }
}


function checkWindowHeight(){
    var height =  window.innerHeight;
    var cartDiv = $('#sitemenuCartDiv');

    if(height > 650){
        cartDiv.css('min-height', '600px');
        cartDiv.css('height', '600px');
    }
    else if (height < 600) {
        cartDiv.css('min-height', '400px');
        cartDiv.css('height', '450px');

    }

}











