/*function logOut(){
 $.ajax({
 url: baseUrl + webPath + logInPath,
 type: "POST",
 data: {
 logOut: "logOut"
 },
 success: function(result){
 sessionStorage.removeItem("user");
 sessionStorage.removeItem("key");
 sessionStorage.removeItem("username");
 sessionStorage.removeItem("password");
 sessionStorage.removeItem("selectedPage");
 window.location = ".." + webPath + indexPath;
 },
 error: function (error) {
 }
 });
 }*/

function loadingOn() {
    $("#popUpWrapLoader").stop(true, true).fadeIn(500);
}

function loadingOff(){
    $("#popUpWrapLoader").stop(true, true).fadeOut(500);
}

function setCookie(name, val) {
    var date = new Date();
    date.setTime(date.getTime() + 86400000);
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + val + ";" + expires + ";path=/";
}

function getCookie(cName){
    var name = cName+ "=";
    var deCookie = decodeURIComponent(document.cookie);
    var array = deCookie.split(";");
    var cookie = "";
    for(i = 0; i < array.length; i++){
        var item = array[i];
        while(item.charAt(0) == " "){
            item = item.substring(1);
        }
        if(item.indexOf(name) == 0){
            cookie = item.substring(name.length, item.length);
        }
    }
    return cookie;
}

function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var latitude;
var longitude;

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(result) {
            latitude = result.coords.latitude;
            longitude = result.coords.longitude;
        });
    }
    else{
        longitude = "null";
        latitude = "null";
    }
}

function checkboxClick(cb){
    if(cb.checked){
        cb.parentNode.style.backgroundColor = "#DC4405";
    }
    else if(!cb.checked){
        cb.parentNode.style.backgroundColor = "transparent";
    }
}



var events = "click tap keyup";
$(".popUpWrapClose").on(events, function(e){
        if($(e.target).is(".popUpWrapClose")){
            e.preventDefault();
            e.stopPropagation();
            $(".popUp").parent().fadeOut(500);
        }
    }
);
function showPopUp(trigger, wrap){
    $(trigger).on(events, function(e){
        e.preventDefault();
        e.stopPropagation();
        $(wrap).fadeIn(500);
    });
}
function hidePopUp(trigger, wrap){
    $(trigger).on(events, function(e){
        e.preventDefault();
        e.stopPropagation();
        $(wrap).fadeOut(500);
    })
}
showPopUp("#footerLink4","#popUpWrapOpeningTimes");

showPopUp("#footerLink1", "#popUpWrapSalesDetails");
hidePopUp("#closeBtnSalesReport", "#popUpWrapSalesDetails");


function closeSalesDetailsDate(){
    $('#popUpWrapSalesDetails').stop(true, true).fadeOut(500);
}

function closeSalesStatistics(){
    $('#salesStatistics').stop(true, true).fadeOut(500);
}

function openSendReportToEmail(){
    $('#sendReportToEmail').stop(true,true).fadeIn(500);
}
function closeSendReportToEmail(){
    $('#sendReportToEmail').stop(true, true).fadeOut(500);
}

function openOpeningTimes(){
    fillDefaultBusinessHours();
    $("#popUpWrapOpeningTimes").stop(true, true).fadeIn(500);
}
function closeOpeningTimes(){
    $("#popUpWrapOpeningTimes").stop(true, true).fadeOut(500);
}
function openSpecialTimes(){
    loadedTimes = false;
    fillSpecialBusinessHours();
    closeOpeningTimes();
    $("#popUpWrapSpecialTimes").stop(true, true).fadeIn(500);
}
function closeSpecialTimes(){
    $("#popUpWrapSpecialTimes").stop(true, true).fadeOut(500);
    openOpeningTimes();
}

function openAddCar(){
    $("#popUpWrapAddCar").stop(true, true).fadeIn(500);

}
function closeAddCar() {
    $("#popUpWrapAddCar").stop(true, true).fadeOut(500);

}
function addDriver() {
    $("#popUpWrapAddDriver").stop(true, true).fadeIn(500);
}
function closeDriver() {
    $("#popUpWrapAddDriver").stop(true, true).fadeOut(500);

}

function openMessage() {
    $("#popUpMessage").stop(true, true).fadeIn(500);
    allMessages();
}
function closeMessage() {
    $("#popUpMessage").stop(true, true).fadeOut(500);

}

function addSpecialTimes(number){
    document.getElementById("addSpecialTimesSubmitBtn").disabled = true;
    $('.selectedFieldsSales').blur();
    $("#popUpWrapAddSpecialTimes").stop(true, true).fadeIn(500);
    sessionStorage.setItem('keyNr', number);
    datePickerKey = sessionStorage.getItem('keyNr');

    if(datePickerKey == 1 || datePickerKey == 2){
        $('.checkboxSection').hide();
        $('.inputAddSpecialTimes').hide();
    }else if(datePickerKey == 3){
        $('.checkboxSection').show();
        $('.inputAddSpecialTimes').show();
    }
}

function closeAddSpecialTimes(){
    loadedTimes = false;
    fillSpecialBusinessHours();
    $("#popUpWrapAddSpecialTimes").stop(true, true).fadeOut(500);

}

function openOrderDetails(){
    $("#popUpWrapOrderDetails").stop(true, true).fadeIn(500);
}

function closeOrderDetails(){
    $("#popUpWrapOrderDetails").stop(true, true).fadeOut(500);
}
/*
 function generateWeeks(){
 var list = document.getElementById("specialTimesWeekSelect");
 for(var i = 1; i < 54; i++){
 list.innerHTML = list.innerHTML + "<option class='listOpt'>Vecka "+i+"</option>";
 }
 }*/

var clicked = [];
var userSelectedDate;
var datePickerKey;

function selectColumn(clicked_id) {
    document.getElementById("addSpecialTimesSubmitBtn").disabled = false;
    var columnDate = document.getElementById(clicked_id).innerHTML;
    if (columnDate != "") {
        if (clicked.length < 1) {
            clicked.push(clicked_id);

            document.getElementById(clicked_id).style.backgroundColor = "#DC4405";
            document.getElementById(clicked_id).style.color = "white";

            var clickedDate = addZeroToDate(document.getElementById(clicked_id).innerHTML);
            var splitString = document.getElementById("monthSelect").innerHTML;
            var currentMonth = addZeroToDate(splitString.split(" ")[0]);
            var currentMonthId = monthNames.indexOf(currentMonth); // 'cuz January starts with 0!!!
            var currentYear = splitString.split(" ")[1];

            userSelectedDate = currentYear.substring(2, 4)+(currentMonthId + 1)+clickedDate;
            document.getElementById("selectedDate").innerHTML = userSelectedDate;
        } else {
            var oldDate = clicked[0];
            document.getElementById(oldDate).style.backgroundColor = "transparent";
            document.getElementById(oldDate).style.color = "#DC4405";
            clicked = [];
            selectColumn(clicked_id);
        }

        /*if (clicked.includes(clicked_id) != true ) {
         clicked.push(clicked_id);
         document.getElementById(clicked_id).style.backgroundColor = "#DC4405";
         document.getElementById(clicked_id).style.color = "white";

         var clickedDate = document.getElementById(clicked_id).innerHTML;
         var splitString = document.getElementById("monthSelect").innerHTML;
         var currentMonth = splitString.split(" ")[0];
         var currentMonthId = monthNames.indexOf(currentMonth); // 'cuz January starts with 0!!!
         var currentYear = splitString.split(" ")[1];

         /*document.getElementById("dateRow").innerHTML = "<tr>"+
         "<td id='oneElementInDate'>"+clickedDate + "-" + (currentMonthId+1) + "-" + currentYear+"</td>"+
         "</tr>";*/ //Multiple Element choose // <---
        /*"<td>"+clickedDate +  "</td>" +
         "-"+
         "<td>"+ (currentMonthId+1) + "</td>" +
         "-" +
         "<td>"+currentYear+"</td>"+
         "</tr>";*/ // if day/ month/ year should be in different <td>*/
        /*document.getElementById("selectedDate").innerHTML = clickedDate + "-" + (currentMonthId+1) + "-" + currentYear;
         } else {
         //alert("jag finns redan i din hasdhkldsa ");
         var index = clicked.indexOf(clicked_id);
         if(index > -1){
         clicked.splice(index, 1);
         document.getElementById(clicked_id).style.backgroundColor = "transparent";
         document.getElementById(clicked_id).style.color = "#DC4405";

         document.getElementById("selectedDate").innerHTML = "";
         }
         }
         */
    } else {

    }
}

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];


function formatDate(date) {

    $("#tableRowLast").hide();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    daysInMonth(monthIndex, year);
    function daysInMonth(month,year) {
        return new Date(year, month+1, 0).getDate(); //+1 eftersom arrayen börjar på 0,,,
    }

    printCalender();

    function printCalender() {
        if(clicked.length == 0) {
            document.getElementById("selectedDate").innerHTML = "";
        }

        $(".txtOrange").attr({style : ""});


        for(var j = 0; j < 42; j++){ // "rensa" alla columner.
            document.getElementById("column"+j).innerHTML = "";
        }

        var firstOfTheMonth = new Date(year, monthIndex, "1").getDay();
        //alert(firstOfTheMonth);
        var changeCss = firstOfTheMonth -1 + day;
        document.getElementById("monthSelect").innerHTML = monthNames[monthIndex] + " " + year;

        var d = new Date();
        var currentMonth = d.getMonth();
        var actualYear = d.getFullYear();


        var splitString = document.getElementById("monthSelect").innerHTML;
        var currentYear = splitString.split(" ")[1];


        if(currentMonth ==  monthIndex && actualYear == currentYear) {
            document.getElementById("column" + changeCss).style.border = "3px solid #DC4405"; //markera dagens datum!
        } else {
            $(".txtOrange").attr({style : ""});

        }

        var numberOfDays = (daysInMonth(monthIndex, year));
        if(firstOfTheMonth == 0){
            firstOfTheMonth = 7;
            $("#tableRowLast").show();
            //Visa sista tabelRowLast
        }

        for (var i = firstOfTheMonth; i < numberOfDays + firstOfTheMonth; i++) {
            /*document.getElementById("tbodyCalender").innerHTML =
             "<tr class='tableRow'>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "</tr>"+
             "<tr class='tableRow'>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "</tr>"+
             "<tr class='tableRow'>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "</tr>"+
             "<tr class='tableRow'>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "<td id='"+i+"'>"+ "</td>"+
             "</tr>";*/

            document.getElementById("column" + (i-1)).innerHTML = JSON.stringify(+i - firstOfTheMonth +1 );
        }
        //document.getElementById("column"+firstOfTheMonth).innerHTML = ;
    }

    // on click

    $("#nextMonth").click(function increment() {
        clicked = [];

        if(monthIndex < monthNames.length-1) {
            monthIndex++;
            document.getElementById("monthSelect").innerHTML = monthNames[monthIndex] + " " + year;
        }
        else{
            monthIndex = -1;
            year = year+1;
            increment();
        }

        /*
         var firstOfTheMonth = new Date(year, monthIndex, "1").getDay(); // Vilken veckodag är den första i denna månad
         var numberOfDays = (daysInMonth(monthIndex, year));



         if(firstOfTheMonth == 0){
         firstOfTheMonth = 7;
         $("#tableRowLast").show();
         //Visa sista tabelRowLast
         }
         for (var i = firstOfTheMonth; i < numberOfDays + firstOfTheMonth; i++) {
         document.getElementById("column" + (i-1)).innerHTML = JSON.stringify(+i - firstOfTheMonth +1);
         }*/
        printCalender();

    });


    $("#prevMonth").click(function decrement() {
        clicked = [];

        if(monthIndex > 0) { // detta fungerar smutt
            monthIndex --;
            document.getElementById("monthSelect").innerHTML = monthNames[monthIndex] + " " + year;
        }else{
            monthIndex = 12;
            year = year-1;
            decrement();
        }
        printCalender();

    });


    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function saveChangedTimes(){
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");
    var visit = [];
    var deliver = [];


    var selectTagDate;
    if(datePickerKey == 1){
        selectTagDate = document.getElementById('selectedDateFrom');
        for(var i = 0; i < selectTagDate.length; i ++){
            selectTagDate.options[i] = null;}

    }else if(datePickerKey == 2){
        selectTagDate = document.getElementById('selectedDateTo');
        for(var i = 0; i < selectTagDate.length; i ++){
            selectTagDate.options[i] = null;}

    }else if(datePickerKey == 3){
        var date = document.getElementById("selectedDate").innerHTML; //Valt Datum
        var closedCheckbox = document.getElementById("closedCb"); // checkbox closed true / false.

        var deliveryFrom = $("#deliveryFromAddSpecial option:selected").text(); //Closed from
        var deliveryTo = $("#deliveryToAddSpecial option:selected").text(); //Closed To

        var pickupFrom = $("#pickupFromAddSpecial option:selected").text() //Closed from
        var pickupTo = $("#pickupToAddSpecial option:selected").text();  //Closed To

        if(closedCheckbox.checked == true){
            alert("Du har valt att stänga din rest under hela dagen den: " + date);
        }
        else {
            if(deliveryFrom && deliveryTo) {
                if (deliveryFrom < deliveryTo) {
                    var deliveryConfirmation = confirm("Du har valt at stänga din utkörning den "+ date+" mellan kl: " + deliveryFrom + " och " + deliveryTo);
                    if(deliveryConfirmation == true){
                        alert("vi postar din data");
                    }
                } else {
                    alert("Dina tider ser inte ut att stämma kolla upp detta och försök igen tack!");
                }
            }

            if(pickupFrom && pickupTo) {
                if (pickupFrom < pickupTo) {
                    var pickupConfirmation = confirm("Du har valt at stänga din avhämtning den "+ date+" mellan kl: " + pickupFrom + " och " + pickupTo);
                    if(pickupConfirmation == true){
                        alert("vi postar din data");
                    }
                } else {
                    alert("Dina tider ser inte ut att stämma kolla upp detta och försök igen tack!");
                }
            }
        }

        if(closedCheckbox == true){
            deliveryFrom = "-1";
            deliveryTo = "-1";
            pickupFrom = "-1";
            pickupTo = "-1";
        } else {
            deliveryFrom = formatTimeFromMidnight(deliveryFrom);
            deliveryTo = formatTimeFromMidnight(deliveryTo);
            pickupFrom = formatTimeFromMidnight(pickupFrom);
            pickupTo = formatTimeFromMidnight(pickupTo);
        }
        visit.push(pickupFrom);
        visit.push(pickupTo);
        deliver.push(deliveryFrom);
        deliver.push(deliveryTo);
        var data = "{\"date\": \""+userSelectedDate+"\", \"visit\":["+visit.toString()+"], \"deliver\":["+deliver.toString()+"]}";
        var success = function (result) {
            loadingOff();
            closeAddSpecialTimes();
        };
        var error = function () {
            loadingOff();
            alert("Nu blev det något knasigt...");
        };
        _patch(sitesEndpoint + "/" + restId + "/businesshours", success, error, data, "hasse_dev_key");
    }
    try{
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(userSelectedDate));
        opt.value = userSelectedDate;
        selectTagDate.add(opt,null);
        selectTagDate.value = userSelectedDate;
    } catch(e){console.dir("Error Caught")}

    if(datePickerKey ==1 || datePickerKey == 2){
        closeAddSpecialTimes()
    }
    sessionStorage.removeItem('keyNr');
}
//console.log(formatDate(new Date()));

var dayStringArray = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function test(cb, index){
}

function closeBusinessCheckBox(cb, index, type){
    var dayCb;
    var dayDelFrom;
    var dayDelTo;
    var dayPickFrom;
    var dayPickTo;
    if(type == 1){
        dayCb = document.getElementById("closeCbSpecial"+index);
        dayDelFrom = document.getElementById("deliveryFromSpecial"+index);
        dayDelTo = document.getElementById("deliveryToSpecial"+index);
        dayPickFrom = document.getElementById("pickUpFromSpecial"+index);
        dayPickTo = document.getElementById("pickUpToSpecial"+index);
    } else if(type == 2){
        dayCb = document.getElementById("closedCb");
        dayDelFrom = document.getElementById("deliveryFromAddSpecial");
        dayDelTo = document.getElementById("deliveryToAddSpecial");
        dayPickFrom = document.getElementById("pickupFromAddSpecial");
        dayPickTo = document.getElementById("pickupToAddSpecial");
    } else{
        var day = dayStringArray[index];
        dayCb = document.getElementById(day+"CloseCb");
        dayDelFrom = document.getElementById(day+"DeliveryFrom");
        dayDelTo = document.getElementById(day+"DeliveryTo");
        dayPickFrom = document.getElementById(day+"PickUpFrom");
        dayPickTo = document.getElementById(day+"PickUpTo");
    }
    dayDelFrom.disabled = cb.checked;
    dayDelTo.disabled = cb.checked;
    dayPickFrom.disabled = cb.checked;
    dayPickTo.disabled = cb.checked;
    if(cb.checked){
        dayDelFrom.style.backgroundColor = "#888888";
        dayDelFrom.style.border = "1px solid #333333";
        dayDelFrom.style.color = "#333333";
        dayDelTo.style.backgroundColor = "#888888";
        dayDelTo.style.border = "1px solid #333333";
        dayDelTo.style.color = "#333333";
        dayPickFrom.style.backgroundColor = "#888888";
        dayPickFrom.style.border = "1px solid #333333";
        dayPickFrom.style.color = "#333333";
        dayPickTo.style.backgroundColor = "#888888";
        dayPickTo.style.border = "1px solid #333333";
        dayPickTo.style.color = "#333333";
    } else{
        dayDelFrom.style.backgroundColor = "#f8ebdc";
        dayDelFrom.style.border = "1px solid #DC4405";
        dayDelFrom.style.color = "#DC4405";
        dayDelTo.style.backgroundColor = "#f8ebdc";
        dayDelTo.style.border = "1px solid #DC4405";
        dayDelTo.style.color = "#DC4405";
        dayPickFrom.style.backgroundColor = "#f8ebdc";
        dayPickFrom.style.border = "1px solid #DC4405";
        dayPickFrom.style.color = "#DC4405";
        dayPickTo.style.backgroundColor = "#f8ebdc";
        dayPickTo.style.border = "1px solid #DC4405";
        dayPickTo.style.color = "#DC4405";
    }
}


function getDateBusinessHours(date){
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");
    var success = function (result) {
        loadingOff();
        return result;
    };
    var error = function () {
        loadingOff();
        alert("nu blev det något knasigt...");
    };
    _get(sitesEndpoint + "/" + restId + businessHoursEndpoint +"/"+date , success, error, sessionKey);
}

function fillDefaultBusinessHours() {
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");
    var success = function (result) {
        loadingOff();
        function checkTimeValid(val){
            if(val == null || val == "23:59:59"){
                val = "00:00";
            } else{
                val = val.substring(0, 5);
            }
            return val;
        }
        for(var i = 0; i < result.length; i++){
            var day = dayStringArray[i];
            var dayCb = document.getElementById(day+"CloseCb");
            var dayDelFrom = document.getElementById(day+"DeliveryFrom");
            var dayDelTo = document.getElementById(day+"DeliveryTo");
            var dayPickFrom = document.getElementById(day+"PickUpFrom");
            var dayPickTo = document.getElementById(day+"PickUpTo");
            if(result[i]["isopen"] == 1){
                dayDelFrom.value = checkTimeValid(result[i]["delivery_open"]);
                dayDelTo.value = checkTimeValid(result[i]["delivery_close"]);
                dayPickFrom.value = checkTimeValid(result[i]["open"]);
                dayPickTo.value = checkTimeValid(result[i]["close"]);
                dayCb.checked = false

            } else{
                dayCb.checked = true;
                dayDelFrom.disabled = true;
                dayDelTo.disabled = true;
                dayPickFrom.disabled = true;
                dayPickTo.disabled = true;
            }
            if(result[i]["close"] == "23:59:59" &&
                result[i]["open"] == "23:59:59" &&
                result[i]["delivery_close"] == "23:59:59" &&
                result[i]["delivery_open"] == "23:59:59"){
                dayCb.checked = true;
                dayDelFrom.disabled = true;
                dayDelTo.disabled = true;
                dayPickFrom.disabled = true;
                dayPickTo.disabled = true;
            }
            checkboxClick(dayCb);
            closeBusinessCheckBox(dayCb, i);
        }
    };
    var error = function () {
        loadingOff();
        alert("nu blev det något knasigt...");
    };
    _get(sitesEndpoint + "/" + restId + "/businesshours" +"/default" , success, error, "hasse_dev_key");
}

function changeDefaultBusinessHours() {
    var visit = [];
    var deliver = [];
    for(var i = 0; i < dayStringArray.length; i++){
        var day = dayStringArray[i];
        var dayCb = document.getElementById(day+"CloseCb");
        var dayDelFrom = document.getElementById(day+"DeliveryFrom");
        var dayDelTo = document.getElementById(day+"DeliveryTo");
        var dayPickFrom = document.getElementById(day+"PickUpFrom");
        var dayPickTo = document.getElementById(day+"PickUpTo");
        if(dayCb.checked == true){
            dayDelFrom = "-1";
            dayDelTo = "-1";
            dayPickFrom = "-1";
            dayPickTo = "-1";
        } else {
            dayDelFrom = $("#"+day+"DeliveryFrom option:selected").text();
            dayDelTo = $("#"+day+"DeliveryTo option:selected").text();
            dayPickFrom = $("#"+day+"PickUpFrom option:selected").text();
            dayPickTo = $("#"+day+"PickUpTo option:selected").text();
            dayDelFrom = formatTimeFromMidnight(dayDelFrom);
            dayDelTo = formatTimeFromMidnight(dayDelTo);
            dayPickFrom = formatTimeFromMidnight(dayPickFrom);
            dayPickTo = formatTimeFromMidnight(dayPickTo);
        }
        visit.push(dayPickFrom);
        visit.push(dayPickTo);
        deliver.push(dayDelFrom);
        deliver.push(dayDelTo);
    }
    var data = "{\"visit\":["+visit.toString()+"], \"deliver\":["+deliver.toString()+"]}";
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");
    var success = function (result) {
        loadingOff();
        closeOpeningTimes();
    };
    var error = function () {
        loadingOff();
        alert("nu blev det något knasigt...");
    };
    _post(sitesEndpoint + "/" + restId + "/businesshours", success, error, data, "hasse_dev_key");

}


var specialHoursArray = [];
function fillSpecialBusinessHours() {
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");
    var success = function (result) {
        loadingOff();
        function checkTimeValid(val){
            if(val == null){
                val = "00:00";
            } else{
                val = val.substring(0, 5);
            }
            return val;
        }
        if(result.length > 0){
            specialHoursArray = result;
            var specialTbody = document.getElementById("specialTimesTbody");
            try{
                specialTbody.innerHTML = "";
                for(var i = 0; i < result.length; i++){
                    specialTbody.innerHTML +=
                        "<tr>"+
                            "<td class='col20 timesDay' id='specialDay"+i+"'></td>"+
                            "<td class='col10'>"+
                                "<label>"+
                                    "<div class='checkbox'><input type='checkbox' id='closeCbSpecial"+i+"' onclick='checkboxClick(this); closeBusinessCheckBox(this, "+i+", 1)'></div>"+
                                "</label>"+
                            "</td>"+
                            "<td class='col35'>"+
                                "<select class='select specialTimeSelect' id='deliveryFromSpecial"+i+"'></select>"+
                                    "<div class='inputSeparator'></div>"+
                                "<select class='select specialTimeSelect' id='deliveryToSpecial"+i+"'></select>"+
                            "</td>"+
                            "<td class='col35'>"+
                                "<select class='select specialTimeSelect' id='pickUpFromSpecial"+i+"'></select>"+
                                    "<div class='inputSeparator'></div>"+
                                "<select class='select specialTimeSelect' id='pickUpToSpecial"+i+"'></select>"+
                            "</td>"+
                        "</tr>";
                }
            } catch (e){
            } finally {
                try{
                    generateSelectTimes(1);
                } catch (e){
                } finally {
                    for(var x = 0; x < result.length; x++){
                        var dayCb = document.getElementById("closeCbSpecial"+x);
                        var dayDelFrom = document.getElementById("deliveryFromSpecial"+x);
                        var dayDelTo = document.getElementById("deliveryToSpecial"+x);
                        var dayPickFrom = document.getElementById("pickUpFromSpecial"+x);
                        var dayPickTo = document.getElementById("pickUpToSpecial"+x);
                        if(result[x]["isopen"] == 1){
                            dayDelFrom.value = checkTimeValid(result[x]["delivery_open"]);
                            dayDelTo.value = checkTimeValid(result[x]["delivery_close"]);
                            dayPickFrom.value = checkTimeValid(result[x]["open"]);
                            dayPickTo.value = checkTimeValid(result[x]["close"]);
                        } else{
                            dayCb.checked = true;
                            dayDelFrom.disabled = true;
                            dayDelTo.disabled = true;
                            dayPickFrom.disabled = true;
                            dayPickTo.disabled = true;
                        }
                        var specialDay = document.getElementById("specialDay"+x);
                        var date = result[x]["date"];
                        var year = date.substring(2, 4);
                        var month = date.substring(5, 7);
                        var day = date.substring(8, 10);

                        specialDay.innerHTML = year+""+month+""+day;
                        checkboxClick(dayCb);
                        closeBusinessCheckBox(dayCb, x, 1);
                    }
                }
            }
            $("#specialTimesTable").stop(true, true).fadeIn(500);
            $("#noSpecialTimes").stop(true, true).fadeOut(500);
            document.getElementById("specialTimesSubmitBtn").disabled = false;
        } else{
            $("#specialTimesTable").stop(true, true).fadeOut(500);
            $("#noSpecialTimes").stop(true, true).fadeIn(500);
            document.getElementById("specialTimesSubmitBtn").disabled = true;
        }
    };
    var error = function () {
        loadingOff();
        alert("nu blev det något knasigt...");
    };
    _get(sitesEndpoint + "/" + restId + "/businesshours" +"/deviating" , success, error, "hasse_dev_key");



}

function changeSpecialBusinessHours(){
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");
    var visit = [];
    var deliver = [];
    for(var i = 0; i < specialHoursArray.length; i++){
        var dayText = document.getElementById("specialDay"+i);
        var dayCb = document.getElementById("closeCbSpecial"+i);
        var dayDelFrom = document.getElementById("deliveryFromSpecial"+i);
        var dayDelTo = document.getElementById("deliveryToSpecial"+i);
        var dayPickFrom = document.getElementById("pickUpFromSpecial"+i);
        var dayPickTo = document.getElementById("pickUpToSpecial"+i);
        if(dayCb.checked == true){
            dayDelFrom = "-1";
            dayDelTo = "-1";
            dayPickFrom = "-1";
            dayPickTo = "-1";
        } else {
            dayDelFrom = $("#deliveryFromSpecial"+i+" option:selected").text();
            dayDelTo = $("#deliveryToSpecial"+i+" option:selected").text();
            dayPickFrom = $("#pickUpFromSpecial"+i+" option:selected").text();
            dayPickTo = $("#pickUpToSpecial"+i+" option:selected").text();
            dayDelFrom = formatTimeFromMidnight(dayDelFrom);
            dayDelTo = formatTimeFromMidnight(dayDelTo);
            dayPickFrom = formatTimeFromMidnight(dayPickFrom);
            dayPickTo = formatTimeFromMidnight(dayPickTo);
        }
        visit.push(dayPickFrom);
        visit.push(dayPickTo);
        deliver.push(dayDelFrom);
        deliver.push(dayDelTo);
        var data = "{\"date\": \""+dayText.innerHTML+"\", \"visit\":["+visit.toString()+"], \"deliver\":["+deliver.toString()+"]}";
        var success = function (result) {
            loadingOff();
            closeSpecialTimes();
        };
        var error = function () {
            loadingOff();
            alert("nu blev det något knasigt...");
        };
        _patch(sitesEndpoint + "/" + restId + "/businesshours", success, error, data, "hasse_dev_key");
    }
}

function addSpecialBusinessHour(){

}

function getDatesForWeek(){
    var week = [];
    for(var i = 0; i < 80; i++) {
        var today = new Date();
        today.setDate(today.getDate() + i);
        var year = today.getFullYear().toString().substring(1, 3);
        var month = addZeroToDate(today.getMonth()+1);
        var day = addZeroToDate(today.getDate());
        var date = year+""+month+""+day;
        week.push(date);
    }
    return week;
}

function addZeroToDate(date){
    if(date < 10){
        date = "0"+date;
    }
    return date;
}

function formatTimeFromMidnight(timeString){
    var hours = timeString.substring(0, 2);
    var minutes = timeString.substring(3, 5);
    hours = parseInt(hours)*3600;
    minutes = parseInt(minutes)*60;
    var seconds = hours+minutes;
    return seconds.toString();
}


var loadedTimes = false;

function generateSelectTimes(type){
    if(loadedTimes == false){
        loadingOn();
        try{
            var list;
            if(type == 0){
                list = document.getElementsByClassName("timeSelect");
            } else if(type == 1){
                list = document.getElementsByClassName("specialTimeSelect");
            }
            var time = [];
            for(var i = 0; i < 24; i++){
                var h;
                var m;
                var clock;
                if(i < 10){
                    h = "0" + i.toString();
                }
                else{
                    h = i.toString();
                }
                for(e = 0; e < 60; e += 15){
                    if(e < 10){
                        m = "0" + e.toString();
                    }
                    else{
                        m = e.toString();
                    }
                    clock = h +":"+ m;
                    time.push(clock);
                }
            }
            for(var i = 0; i < list.length; i++){
                for(var x = 0; x < time.length; x++){
                    list[i].innerHTML = list[i].innerHTML + "<option>"+time[x]+"</option>";
                }
            }
        } catch (e){
        } finally {
            loadingOff();
            if(type == 0){
                fillDefaultBusinessHours();
            }
            loadedTimes = true;
        }
    }
}

var checkedCheckboxesArray = [];
function checkboxId(id){
    id = parseInt(id);
    var checkbox = document.getElementById("cb"+id);
    if(checkbox.checked){
        if(checkedCheckboxesArray.length == 0){
            checkedCheckboxesArray.push(id);
            document.getElementById(id).style.backgroundColor = "#DC4405";

        }
        else if(checkedCheckboxesArray.includes(id)){
            //alert("finns redan!");
        } else {
            checkedCheckboxesArray.push(id);

            document.getElementById(id).style.backgroundColor = "#DC4405";
        }

    } else if (!checkbox.checked){
        for(var i = 0; i < checkedCheckboxesArray.length; i++){
            if(checkedCheckboxesArray[i] == id){
                checkedCheckboxesArray.splice(i, 1);
                document.getElementById(id).style.backgroundColor = "transparent";

            }
        }
        if(checkedCheckboxesArray.length == 0){

        }
    }

}



function sendNewPassword(){
    loadingOn();
    var sessionKey = localStorage.getItem("keyRTC");
    var sendEmailTo = document.getElementById("forgotUsername").value;
    var success = function(result){
        alert("En återställningslänk kommer skickas till " +sendEmailTo+"");
        $('#popUpWrap4').stop(true, true).fadeIn(500);
        loadingOff();
    };
    var error = function(result){
        alert("Något gick fel, försök igen!");
        loadingOff();
    };
    if(sendEmailTo != null && sendEmailTo != ""){
        _get(loginEndpoint + forgotEndpoint+"?user="+sendEmailTo, success, error, sessionKey);
    } else{
        alert("Vänligen fyll i mailadress");
        loadingOff();
    }
}

function forgottenPassword(){
    $("#forgotFormDiv").stop(true, true).fadeIn(500);
    $("#logInFormDiv").hide();
}

function redirectToLogIn() {
    $("#forgotFormDiv").hide();
    $("#logInFormDiv").stop(true, true).fadeIn(500);
}

function logOut(){
    loadingOn();
    $.ajax({
        url: baseUrlWeb + logInPath,
        type: "POST",
        data: {
            logOut: "logOut"
        },
        success: function(result){
            if(localStorage.getItem("remember")){
                localStorage.removeItem("email");
                localStorage.removeItem("password");
                localStorage.removeItem("remember");
                localStorage.removeItem("user");
                localStorage.removeItem("key");
                deleteCookie("loggedIn");
            }
            else{
                sessionStorage.removeItem("password");
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("key");
                sessionStorage.removeItem("loggedIn");
            }
            loadingOff();
            location.reload();
        },
        error: function (error) {
            loadingOff();
        }
    });
}

var messageArr = [];
function allMessages(){
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");

    var success = function(result){
        document.getElementById("listAllUnreadMessages").innerHTML ="";
        document.getElementById("listAllMessages").innerHTML = "";



        for(var i = 0; i < result.result.length; i++) {

            var subject = result.result[i].subject;
            var message = result.result[i].message;
            var id = i;

            var messageObj = {};
            messageObj["Subject"] = subject;
            messageObj["Message"] = message;
            messageObj["Id"] = id;
            messageArr.push(messageObj);

            if(result.result[i].read != null){
                document.getElementById("listAllMessages").innerHTML +=
                    "<li class='messageListElement' onclick='displayThisMessage("+i+")'>"+ result.result[i].subject + "</li>";
            }else{

                document.getElementById("listAllUnreadMessages").innerHTML +=
                    "<li class='messageListElement' onclick='displayThisMessage("+i+"); markAsRead(\""+result.result[i].id+"\"); '>"+ result.result[i].subject + "</li>";

            }
        }
    };
    var error = function(){
        console.dir("Nu blev något fel...");
    };


    _get(sitesEndpoint +"/" + restId +"/messages", success, error ,sessionKey)
}

function displayThisMessage(i) {
    document.getElementById("scrollThis").scrollIntoView();
    document.getElementById("subjectOfSpecificMessage").innerHTML = "";
    document.getElementById("theMessage").innerHTML = "";
    document.getElementById("subjectOfSpecificMessage").innerHTML = messageArr[i].Subject;
    document.getElementById("theMessage").innerHTML = messageArr[i].Message;
}

function markAsRead(mid){
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");

    var success = function(){
       // alert("success");
        allMessages();
    };
    var error = function(){
        //alert("error");

    };

    _put(sitesEndpoint + "/" +restId + "/messages/" + mid , success, error, "", sessionKey);
}

function alertUnreadMessage(){
    var sessionKey = localStorage.getItem("keyRTC");
    var restId = localStorage.getItem("siteRTC");

    var success = function(result){

        for(var i = 0; i < result.result.length; i++) {

            if(result.result[i].read != null){
                //document.getElementById("chatImgFooter").src='../rtc/img/chat.png';

            }else{
                document.getElementById("chatImgFooter").src='../rtc/img/ChatNoNotif.png';

            }
        }
    };
    var error = function(){
        console.dir("Nu blev något fel...");
    };


    _get(sitesEndpoint +"/" + restId +"/messages", success, error ,sessionKey)

}