<?php
include('php/includes.php');
session_start();
if(isset($_SESSION['5029893130'])){?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Matsugen - Betala </title>
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
    <script src="js/settings.js"></script>
    <script src="js/cart.js"></script>
    <script src="js/payment.js"></script>
    <script src="js/head.js"></script>
</head>
<body class="noScroll hideSideBar">
<header class="header">
    <?php include('includes/menu.php');?>
</header>
<div class="body settingsBodyClass" id="settingsBody">
    <div class="sectionCenter  settingsDivClass resizeSettingsDivClass" id="settingsDiv">
        <div class="topHead">MINA UPPGIFTER</div>
        <div id="myPageUnderFirstHead" class="settingsSectionDiv">
            <div class="myPageSection">
                <input class="myPageInputHalf txtInput" id="myPageFirstName" placeholder="Förnamn *" type="text" tabindex="1">
                <input class="myPageInputHalf txtInput" id="myPageSurName" placeholder="Efternamn *" type="text" tabindex="2">
            </div>
            <div class="myPageSection">
                <input class="myPageInputHalf txtInput" id="myPagePhoneNumber" placeholder="Telefonnummer *" type="text" tabindex="3">
                <input class="myPageInputHalf txtInput" id="myPageEmail" placeholder="Email *" type="text" tabindex="4">
            </div>
        </div>
        <div class="topHead" id="adressTitle">MIN ADRESS</div>
        <div id="myPageSecondBody" class="settingsSectionDiv">
            <div class="myPageSection">
                <input class="myPageInputHalf txtInput" id="myPageAddress" placeholder="Adress *" tabindex="5">
                <input class="myPageInputHalf txtInput" id="myPagePostCode" placeholder="Postnummer *" tabindex="6">
            </div>
            <div class="myPageSection">
                <input class="myPageInputHalf txtInput" id="myPageCity" placeholder="Ort *" tabindex="7">
                <input class="myPageInputHalf txtInput" id="myPageApNr" placeholder="Lägenhetsnummer" tabindex="8">
            </div>
            <div class="myPageSection">
                <input class="myPageInputHalf txtInput" id="myPageFloor" placeholder="Våning" tabindex="9">
                <input class="myPageInputHalf txtInput" id="myPageDoorCode" placeholder="Portkod" tabindex="10">
            </div>
            <div class="myPageSection">
                <textarea class="myPageInputMedium txtInput" id="myPageOtherInfo" placeholder="Övrig information" tabindex="11"></textarea>
            </div>
        </div>
        <div id="paymentCheckboxBody" class="settingsSectionDiv">
            <p class="txt11 opacity05"> * = obligatoriska fält </p>

        </div>
        <div class="topHead">LEVERANSSÄTT</div>
        <div class="settingsSectionDiv switchDiv">
            <div class="switchWrapper">
                <label>
                    <input type="checkbox" id="paymentDeliveryCheckbox" onclick="paymentSwitchChange(0)">
                    <div class="switch">
                        <label class="switchTxt" for="paymentDeliveryCheckbox">Utkörning</label>
                    </div>
                </label>
                <label>
                    <input type="checkbox" id="paymentPickUpCheckbox" onclick="paymentSwitchChange(1)">
                    <div class="switch">
                        <label class="switchTxt" for="paymentPickUpCheckbox">Avhämtning</label>
                    </div>
                </label>
            </div>
        </div>

        <div class="topHead">BETALMETOD</div>
        <div class="settingsSectionDiv switchDiv">
            <div class="switchWrapper">
                <label>
                    <input type="checkbox" id="paymentCardCheckbox" onclick="paymentSwitchChange(2)">
                    <div class="switch">
                        <label class="switchTxt" for="paymentCardCheckbox">Kort</label>
                    </div>
                </label>
                <label>
                    <input type="checkbox" id="paymentCashCheckbox" onclick="paymentSwitchChange(3)">
                    <div class="switch">
                        <label class="switchTxt" for="paymentCashCheckbox">Kontant</label>
                    </div>
                </label>
            </div>
        </div>
        <div id="myPageLastBody" class="paymentLastDiv">
            <div class="checkboxSection">
                <label>
                    <div class="checkbox">
                        <input class="checkboxBtn" id="paymentCheckboxAccept" type="checkbox" onclick="checkboxClick(this); clearThis();">
                    </div>
                </label>
                <label class="checkboxTxt" id="checkboxAccept" tabindex="1" for="paymentCheckboxAccept">Genom att betala så godkänner jag <a href="" class="conditionsClass conditionsColor" id="conditionsPayment">användarvillkoren</a></label>
            </div>
            <button id="paymentSubmit" class="submitBtn" onclick="placeOrder()">BETALA</button>
        </div>
    </div>

    <div class="sectionRight cart resizeCart" id="paymentCartDiv">
        <?php include('includes/cart.html');?>
    </div>


</div>
<footer class='footer'>
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
