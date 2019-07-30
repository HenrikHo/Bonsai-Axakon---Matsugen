<?php
session_start();
if(isset($_SESSION['5003298870'])){?>
    <script src="../rtc/js/orders.js"></script>
    <div class="wrapper" id="ordersWrap">
        <ul class="list" id="ordersList">
        </ul>
        <a onclick="getOrders()" style="color: #DC4405">Uppdatera</a>

    </div>

    <p id="noOrdersMsg" class="txt20 txtOrange">Det finns inga ordrar just nu</p>
<?php
}
else{
    header("Location: ../rtc/index.php");
}
?>
