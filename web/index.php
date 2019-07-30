<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Matsugen - Hem</title>
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
    <script src="js/index.js"></script>
    <?php
        if(!isset($_SESSION['5029893130'])){
            echo '<script src="js/loggedOut.js"></script>';
        }
    ?>

</head>
<body class="noScroll hideSideBar" id="indexBody">
<header class="header" id="indexHeader">
    <?php include('includes/menu.php');?>
</header>

<div class="body">
    <div class="wrapper upperWrapper">
        <h1>Du har alltid nära till god mat!</h1>
        <div id="menuLogo">
            <a id="menuLogoLink" href="../web/index.php">
                <img src="img/Matsugen_logo.png">
            </a>
        </div>
        <img class="homeBannerImg" id="homeBannerImg1" src="img/food1.jpg">
        <img class="homeBannerImg" id="homeBannerImg2" src="img/food2.jpg">
        <img class="homeBannerImg" id="homeBannerImg3" src="img/food3.jpg">
        <img class="homeBannerImg" id="homeBannerImg4" src="img/food4.jpg">
        <div class="roundTransparentWhite">
            <input class="txtInput" id="homeAddress"  placeholder="Ange postnummer, gata eller stad">
            <img onclick="getUserLocation()" id="getGeoImg" src="/web/img/navigation.png">
            <button class="roundBtn" id="homeSearchBtn" data-question="{{result['question']}}" onclick="search(document.getElementById('homeAddress').value)"><img class="btnLogo" src="img/Matsugen_symbol_Orange_pos.png"></button>
        </div>

        <div id="howToOrder">
            <div class="wrapperOfHowTo">
                <div id="first" class="contentOfHowTo">
                    <div class= roundOutline> <img id="store" class="stayInsideLines" src="img/store.png"> </div>
                    <p class="txt11 whiteTxt">1. VÄLJ RESTAURANG</p>
                </div>
                <div id="second" class="contentOfHowTo">
                    <div class= roundOutline > <img id="forkAndKnife" class="stayInsideLines" src="img/forkknife.png"> </div>
                    <p class="txt11 whiteTxt">2. VÄLJ RÄTT</p>
                </div>
                <div id="third" class="contentOfHowTo">
                    <div class= roundOutline> <img  id="creditCard" class="stayInsideLines" src="img/card.png"> </div>
                    <p class="txt11 whiteTxt">3. BETALA</p>
                </div>
            </div>
        </div>
    </div>
    <div class="wrapper bottomWrapper">
        <div class="bottomImgWrapper">
            <img class="bottomImg" src="img/handphone.png">
        </div>
        <div class="bottomTxtWrapper">
            <h1>Ladda ner vår grymma app!</h1>
            <p class="infoTxt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </div>
        <div class="bottomLinkWrapper">
            <div class="bottomLinks">
                <a class="appLink" id="appStoreLink" href="https://google.se" target="_blank">
                    <img class="appLinkImg" src="img/appStoreBtn.png">
                </a>
                <a class="appLink" id="googlePlayLink" href="https://google.se" target="_blank">
                    <img class="appLinkImg" src="img/googlePlayBtn.png">
                </a>

            </div>
        </div>
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