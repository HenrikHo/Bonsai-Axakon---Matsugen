/**
 * Created by hank on 2017-08-15.
 */
$(document).ready(function() {
});

$(window).on("load", function () {
});

function suggestRestaurantAccept() {
    var restaurantName = document.getElementById("restaurantName").value;
    var restaurantAddress = document.getElementById("restaurantAddress").value;
    var restaurantLocationTown = document.getElementById("restaurantLocationTown").value;
    var restaurantPhone = document.getElementById("restaurantPhoneNumber").value;

    var messageFromRestOwner = document.getElementById("restaurantMessage").value;
    alert(" Tack för ditt förslag av " + restaurantName + " på " +restaurantAddress);
    if (messageFromRestOwner) {
        alert("Tack för du tog extra tid till att föreslå: " + messageFromRestOwner);
    }
}