<?php
include('php/includes.php');
session_start();
if(isset($_SESSION['5029893130'])){?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> Matsugen - Mina Beställningar</title>
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
    <script src="js/myorders.js"></script>
</head>
<body class="hideSideBar noScroll">
<header class="header">
    <?php include('includes/menu.php');?>
</header>
<div class="body" id="myordersBody">
    <div class="wrapperMyOrders resizeWrapperMyOrders">
    <div class="sectionCenter ordersDivClass resizeOrdersDivClass resizeLeft" id="ordersDiv">
        <div class="topHead">MINA BESTÄLLNINGAR</div>
        <div id="myPageUnderFirstHead" class="ordersSectionDiv">
            <div class="myordersUnderOnlySection" id="myordersUnderOnlySectionTabOrder">
                <ul class="myordersTable resizeMyOrdersTable">
                        <li class="myordersRow" id="myordersHead">
                            <p class="headElement col25 resizeFontSize">Datum:</p>
                            <p class="headElement col20 resizeFontSize" >Restaurang:</p>
                            <p class="headElement col20 resizeFontSize">Ordernummer:</p>
                            <p class="headElement col10 resizeFontSize">Summa:</p><p class="col25"></p>
                        </li>
                    <div id="contentOfListFromJs">
                    </div>

                </ul>
            </div>
        </div>
    </div>
    <div class="rightSideDivClass resizeRightSideDiv resizeLeft" id="rightSideDiv">
        <div id="favouritesTitle">Favoriter</div>
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
<?php
}
else{
    header("Location:" . $_baseUrlWeb . $_indexPath);
 /* header("Location: http://matsugense.azurewebsites.net/web/index.php");*/
}
?>