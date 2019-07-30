<?php
session_start();
if(isset($_SESSION['5003298870'])){?>
    <script src="../rtc/js/settings.js"></script>
    <script src="js/orders.js"></script>
    <div class="wrapper" id="settingsWrap">
        <div class="settingsWrapper">
            <ul id="adsList">
            </ul>
            <p>Lägg till annons</p>
            <div class="settingsAddNewInformationDiv" id="newAdForm">
                <select class="select adAndRadiousSelect" id="adPriceSelect"></select>
                <textarea class="txt16" id="adText" placeholder="Lägg till en text till din annons"></textarea>
                <button class="submitBtn" id="adsBtn">Lägg till</button>
            </div>


            <p>Utkörnings Radie</p>
            <div class="settingsAddNewInformationDiv" id="newRadiusForm">
                <p>Nuvarande radie: *22km</p>
                <select class="select adAndRadiousSelect" id="radiusSelect">
                    <option hidden>Utöka radie</option>
                    <option>1-3 km</option>
                    <option>4-6 km</option>
                    <option>7-9 km</option>
                    <option>10-12 km</option>
                    <option>12-14 km</option>
                    <option>15-17 km</option>
                    <option>18-20 km</option>

                </select>
                <button class="submitBtn" id="adsBtn">Lägg till</button>
            </div>


            <a class="arrows adAndRadiousSelect" onclick="logOut()"> Logga Ut...</a>

        </div>
        <div class="settingsWrapper">
            <p>Ändra kategorier</p>
            <div id="categoriesListFood">
            </div>
            <button class="submitBtn" id="categoriesBtn" onclick="changeCategories()">Spara</button>
        </div>

        <div class="labelFee">
            <label>
            Utkörningspris: <input type="text" id="deliveryFee" class="txtInput txtInputFee">
                <br>
            Minsta utkörnigspris:<input type="text" id="min_delivery_fee" class="txtInput txtInputFee">
                <br>
            Gratis utkörning: <input type="text" id="freeDelivery" class="txtInput txtInputFee">
            </label>
            <button class="submitBtn" onclick="changeFees()">Spara</button>

        </div>

    </div>
<?php
}
else{

    header("Location: ../rtc/index.php");
}
?>








