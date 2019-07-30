<?php
session_start();
if(isset($_SESSION['5003298870'])){?>
    <script src="../rtc/js/cars.js"></script>
    <label>Bilar</label>
    <div class="wrapper" id="carsWrap">
<!--
        <div class="carObj">
            <a class="carLink txt40" id="addCar" onclick="openAddCar()">+</a>
        </div>
        <div class="carObj">
            <a class="carLink txt20" id="addCar">Förare</a>
            </div>
-->
    </div>

<?php
}
else{
    header("Location: ../rtc/index.php");
}
?>


