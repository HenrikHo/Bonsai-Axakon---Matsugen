<?php
include('php/includes.php');
session_start();
if(isset($_SESSION['5029893130'])){
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Matsugen - Orderstatus</title>
    <meta charset="UTF-8">
    <meta name="description" content="Matsugen.se">
    <meta name="viewport" content="width=device-width, initial-scale=0.9">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="icon" href="">
    <link rel="apple-touch-icon" href="">
    <script src="js/jquery-3.2.1.js"></script>
    <script src="../staticalVariables/REST.js"></script>
    <script src="js/includes.js"></script>
    <script src="js/global.js"></script>
    <script src="js/orderCD.js"></script>
    <script src="js/cart.js"></script>
</head>
<body class="hideSideBar noScroll">
<header class="header">
    <?php include('includes/menu.php');?>
</header>

<div class="body" id="orderCountdown">

    <div class="countdownWrapperOrder" id="countdownOrder">

        <h1 class="TackFörDinBeställning" id="headerTack">TACK FÖR DIN BESTÄLLNING!</h1>
        <div class="animationDivClock">

            <div id="gifDiv">
                <img class="countdownGif" src="img/loadingLoop.gif" id="countdownGif1">

            </div>
        </div>
        <div class="lowerCountdownDiv" id="lowercountdown">

            <div class="countdownLeftOrderInfo" id="countdownOrderInformation">

                <div class="countdownRestaurantInfoDiv" id="countdownTopRestaurantInfo">
                    <ul id="countdownListInformation" class="countdownInformationListLeft">
                        <li id="">
                            <p class="" id="">Uppskattad Leveranstid:</p>
                            <p id="orderCDEstimatedDelivery"></p>
                        </li>
                        <li id="">
                            <p>Restaurang:</p>
                            <p id="orderCDRestaurantName"></p>
                        </li>
                        <li id="">
                            <p>Restaurangens TelefonNr:</p>
                            <p id="orderCDRestaurantPhoneNumber"></p>
                        </li>
                    </ul>
                </div>

                <div class="countdownLowerOrderInfoDiv" id="lowerOrderInfo">
                        <ul class="countdownInformationListLeft">
                            <li>
                                <p class="leftText">Order Id:</p>
                                <p class="rightText" id="orderCDOrderNr"></p>

                            </li>
                            <li>
                                <p class="leftText">Beställarens namn:</p>
                                <p class="rightText" id="orderCDName"></p>

                            </li>
                            <li>
                                <p class="leftText">Användarkonto:</p>
                                <p class="rightText" id="orderCDEmail"></p>

                            </li>
                            <li>
                                <p class="leftText">Leveranssätt:</p>
                                <p class="rightText" id="orderCDDeliveryWay"></p>

                            </li>
                            <li>
                                <p class="leftText">Leveransadress:</p>
                                <p class="rightText" id="orderCDDeliveryAddress"></p>

                            </li>
                            <li>
                                <p class="leftText">Ditt telefonnummer:</p>
                                <p class="rightText" id="orderCDPhoneNumber"></p>

                            </li>
                            <li>
                                <p class="leftText">Betalsätt:</p>
                                <p class="rightText" id="orderCDPaymentWay"></p>

                            </li>
                            <li>
                                <p class="leftText">Beställningstid:</p>
                                <p class="rightText" id="orderCDOrderCreationTime"></p>

                            </li>
                            <li>
                                <p class="leftText">Ditt Kvitto:</p>
                                <a class="rightText" href="https://google.se">Klicka här</a>
                            </li>
                        </ul>
                </div>
            </div>




            <div class="countdownRightOrderInfoDiv" id="countdownRightOrderInformation">
                <div id="sitemenuRightSideDivHead"> Min Order</div>


                <div class="sitemenuTableDiv">
                    <div class="sitemenuRightSideDivTable txt11" id="sitemenuTableReceipt">
                        <div class="sitemenuRightSideDivTableHead">
                            <div class="col25">Antal</div>
                            <div class="col50">Maträtt</div>
                            <div class="col25">Summa</div>
                        </div>
                        <ul id="sitemenuBill">
                        </ul>
                    </div>
                </div>
                <div id="demandsDiv">
                    <p class=""></p>
                    <p class=""></p>
                </div>

                <div class="sitemenuRightSideDivSummary">
                    <p class="txt16" id="totalSum"></p>
                    <p class="txt11" id="tax"></p>
                </div>


            </div>

        </div>
    </div>



</div>



<footer>
    <?php include('includes/footer.html');?>
</footer>

    <?php include('includes/popups.html');?>
<!--Start of Tawk.to Script-->
<script type="text/javascript">
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/59e4c2bb4854b82732ff5dda/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    })();
</script>
<!--End of Tawk.to Script-->
</body>

</html>

<?php

}
else{
    header("Location:" . $_baseUrlWeb . $_indexPath);
}
?>