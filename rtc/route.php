<?php
session_start();
if(isset($_SESSION['5003298870'])){?>
    <div class="wrapper" id="routeWrap">
        <label>ROUTE</label>
    </div>
<?php
}
else{
    header("Location: ../rtc/index.php");
}
?>
