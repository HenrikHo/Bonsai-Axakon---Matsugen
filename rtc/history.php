<?php
session_start();
if(isset($_SESSION['5003298870'])){?>
    <script src="../rtc/js/history.js"></script>
    <script src="js/orders.js"></script>
    <label>HISTORY</label>
    <div class="wrapper" id="historyWrap">
        <div class="carObj historyObj">
            <p class="txt20 bold carObjName">Levererat</p>
            <div class="carObjListWrap">
                <ul class="list" id="historyWrapDelivered">
                </ul>
            </div>
        </div>
        <div class="carObj historyObj">
            <p class="txt20 bold carObjName">Ej levererad</p>
            <div class="carObjListWrap">
                <ul class="list" id="historyWrapNotDelivered">
                </ul>
            </div>
        </div>
        <div class="carObj historyObj">
            <p class="txt20 bold carObjName">Hämtad</p>
            <div class="carObjListWrap">
                <ul class="list" id="historyWrapPickedUp">
                </ul>
            </div>
        </div>
        <div class="carObj historyObj">
            <p class="txt20 bold carObjName">Ej hämtad</p>
            <div class="carObjListWrap">
                <ul class="list" id="historyWrapNotPickedUp">
                </ul>
            </div>
        </div>
    </div>
<?php
}
else{

    header("Location: ../rtc/index.php");
}
?>








