<?php
session_start();
if(isset($_SESSION['5003298870'])){?>
    <script src="../rtc/js/menu.js"></script>
    <script src="../rtc/js/orders.js"></script>
    <div class="menuWrapper">
        <div id="menuLogo">
            <a id="menuLogoLink" href="../rtc/index.php">
                <img src="../rtc/img/Matsugen_symbol_Orange_pos.png">
                <label for="menuLogoLink"></label>
            </a>
        </div>
        <div id="menuButtons">
            <a class="menuLink menuLinkRight txt14" id="menuLink1" onclick="setSelectedMenuLink(1)">
                <label class="menuLinkTxt" id="menuLinkTxt1" for="menuLink1">Aktiva ordrar</label>
                <div class="menuIndicator" id="menuIndicator1"></div>
            </a>
            <a class="menuLink menuLinkRight txt14" id="menuLink2" onclick="setSelectedMenuLink(2)">
                <label class="menuLinkTxt" id="menuLinkTxt2" for="menuLink2">Bilar</label>
                <div class="menuIndicator" id="menuIndicator2"></div>
            </a>
            <a class="menuLink  txt14" id="menuLink3" onclick="setSelectedMenuLink(3)">
                <label class="menuLinkTxt" id="menuLinkTxt3" for="menuLink4">Karta</label>
                <div class="menuIndicator" id="menuIndicator3"></div>
            </a>
            <a class="menuLink menuLinkLeft txt14 " id="menuLink4" onclick="setSelectedMenuLink(4)">
                <label class="menuLinkTxt" id="menuLinkTxt4" for="menuLink4">Historik</label>
                <div class="menuIndicator" id="menuIndicator4"></div>
            </a>
            <a class="menuLink menuLinkLeft txt14 " id="menuLink5" onclick="setSelectedMenuLink(5)">
                <label class="menuLinkTxt" id="menuLinkTxt5" for="menuLink4">Inställningar</label>
                <div class="menuIndicator" id="menuIndicator5"></div>
            </a>
        </div>
        <div id="menuStatus">
            <label class="txt14" id="menuStatusTxt" for="menuStatusBtn">ONLINE</label>
            <img id="menuStatusBtn" src="../rtc/img/power.png">
        </div>
    </div>
<?php
}
else{ ?>

<?php
}
?>