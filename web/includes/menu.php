<?php
session_start();
if(isset($_SESSION['5029893130'])){?>
    <script src="js/menu.js"></script>
    <div class="menuWrapper">
        <div id="menuLogoHead">
            <a id="menuLogoLink" href="../web/index.php">
                <img id="menuLogoHeadImg" src="img/Matsugen_logo.png">
            </a>
        </div>
        <div id="menuButtonsWrapper">

            <div class="menuButtons">
                <a class="menuLink" id="menuLink1" href="../web/index.php">BESTÄLL MAT</a>
                <a class="menuLink" id="menuLink2" href="../web/myorders.php">MINA BESTÄLLNINGAR</a>
                <a class="menuLink" id="menuLink3" href="../web/settings.php">MINA UPPGIFTER</a>
            </div>
        </div>
        <div id="menuSearch">
            <input class="txtInput" id="menuSearchTxt" placeholder="Ange postnummer, gata eller stad">
            <button class="roundBtn" id="menuSearchBtn" data-question="{{result['question']}}" onclick="search(document.getElementById('menuSearchTxt').value)"><img class="btnLogoMenu" src="img/Matsugen_symbol_Orange_pos.png"></button>
        </div>
    </div>
    <div class="headSeparator"></div>

<?php
}
else{ ?>
    <script src="js/head.js"></script>
    <div class="menuWrapper">
        <div id="menuLogoHead">
            <a id="menuLogoLink" href="../web/index.php">
                <img id="menuLogoHeadImg" src="img/Matsugen_logo.png">
            </a>
        </div>
        <div class="topButtons">
            <button class="headLogInButtons txt14" id="headLogIn">LOGGA IN</button>
            <div class="spaceBetween"></div>
            <button class="headLogInButtons txt14" id="headPageCreateAccount">SKAPA KONTO</button>
        </div>
    </div>
    <div class="headSeparator"></div>
<?php
}
?>



