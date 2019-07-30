/**
 * Created by henri on 2017-09-29.
 */
$(document).ready(function() {

});

$(window).on("load", function () {
});

function getHistory(callback){
    loadingOn();
    var wrapper;
    var color;
    var id = localStorage.getItem("userRTC");
    var key = localStorage.getItem("keyRTC");
    var success = function(result) {


    for(var i = 0; i < result.result.length; i++){
        var order = result.result[i];
        var status = result.result[i].status;
        var deliveryType = result.result[i].delivery_type;
        if(status == 1) { // 4
            if (deliveryType == "PICKUP") {
                wrapper = "historyWrapNotPickedUp";
                color = "#8B0057";
            } else if (deliveryType == "DELIVER") {
                wrapper = "historyWrapNotDelivered";
                color = "#5AAA96";
            }
                } else if(status == 6){ // 7
                        if(deliveryType == "PICKUP"){
                            wrapper = "historyWrapPickedUp";
                            color = "#D26A5B";
                        }else if(deliveryType == "DELIVER"){
                            wrapper = "historyWrapDelivered";
                            color = "#5AAA96";
                        }
                }
            fillHistoryList(wrapper, i, order, color);
            }
  };
  loadingOff();

  var error= function(result){
    loadingOff();
  };
    _get(sitesEndpoint + ordersEndpoint+"?page_size=0" , success, error, key);

    if(callback){
        callback();
    }
}

function fillHistoryList(wrapper, i, order, color) {
    var orderId = order.id;
    var userId = order.user_id;
    var deliver = new Date(order.estimated_delivery);
    var deliverBy = deliver.getHours() + ":" + deliver.getMinutes();
    var historyList = document.getElementById(wrapper);
    var address = order.address.street + ", " + order.address.area_code + " " + order.address.city;
try{
    historyList.innerHTML = historyList.innerHTML +
        "<li class='listObj' id='listObj"+ i +"' value='"+ orderId +"'>"+
        "<div>" +
        "<div style='background-color: "+color+"' class='carObjInfo resizeCarObj carobjDisplayBlock' id='"+orderId+"'  onclick='showRec(this.id,"+userId+");'>"+
        "<ul class='carListInfo carObjListObjClass'>"+
        "<li>"+
        "<p class='txt20 bold listObjNumber'>"+ orderId +"</p>"+
        "<p class='listObjInfoTime txt14 bold' id='deliveryTime"+i+"'>"+deliverBy+"</p>"+
        "</li>"+
        "</ul>"+
        "<p class='listObjInfoAddress txt16 normal resizeFontSize'>"+address+"</p>" +
        "</div>"+
        "</div>" +
        "</li>";

    if(order.status == 4 && order.delivery_type == "DELIVER"){
        var deliverTime = order.actual_delivery;
        document.getElementById("deliveryTime"+i).innerHTML += "Delivered: " + deliverTime
    }
}catch(e){
}
}


















