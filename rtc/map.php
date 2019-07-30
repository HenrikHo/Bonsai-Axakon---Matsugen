<?php
session_start();
if(isset($_SESSION['5003298870'])){?>
    <script src="../rtc/js/map.js"></script>

        <div class="bodyHead" id="bodyHeadId">
            <!--<a class="carLink txt20" id="addCar" onclick="addCar()"> + </a>
            <a class="carLink txt20" id="car0" onclick="carInfo(0, 59.2802596, 15.2257319); carDeliveryPoints(0);">Bil 1</a>
            <a class="carLink txt20" id="car1" onclick="carInfo(1, 59.274587, 15.205464); carDeliveryPoints(1);">Bil 2</a>
            <a class="carLink txt20" id="car2" onclick="carInfo(2, 59.27884, 15.2024263); carDeliveryPoints(2);">Bil 3</a>
            <a class="carLink txt20" id="car3" onclick="carInfo(3, 59.266214, 15.2190613);carDeliveryPoints(3);">Bil 4</a>
            <a class="carLink txt20" id="carAll" onclick="carInfoAll()">Alla bilar</a>
           -->
        </div>
    <div class="wrapper" id="mapWrap">
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgQSW-NPgNhyPiZFOWoDk2--7YXpev0wA"></script>
    </div>
<?php
}
else{
    header("Location: ../rtc/index.php");
}
?>
