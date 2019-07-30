<?php
session_start();
if(isset($_SESSION['5029893130']) && isset($_COOKIE['loggedIn'])){
    setcookie('loggedIn', "", time()-7000000, "/");
    unset($_COOKIE['loggedIn']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Matsugen - Kontakta oss</title>
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
        <script src="js/contact.js"></script>
</head>

<header class="header">
    <?php include('includes/menu.php');?>
</header>
<body class="hideSideBar noScroll">
<div id="contactWrapper">
    <div class="centerTxtWrapper">
        <h1>Ladda ner vår grymma app!</h1>
        <p class="contactInfoTxt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    </div>

    <div id="contentInputWrapper">
        <div id="inputsContainer">
            <div id="contentInputWrapperLeft">
                <input class="myPageSecondInputSmall txtInput" id="contactName" placeholder="Name">
                <input class="myPageSecondInputSmall txtInput" id="contactEmailSender" placeholder="Epost du vill bli kontktad på *">
                <input class="myPageSecondInputSmall txtInput" id="contactEmailOrder" placeholder="Epost som används vid beställning">
                <input class="myPageSecondInputSmall txtInput" id="contactOrderNumber" placeholder="Ordernummer">
            </div>
            <div id="contentInputWrapperRight">
                <textarea class="txtInput" id="contactMessage" placeholder="Meddelande"></textarea>
            <button id="sendMessageButton"> SKICKA</button>
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