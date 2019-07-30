<?php
session_start();
if(isset($_SESSION['5003298870'])){
    header("Location: ../rtc/home.php");
}
else{
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RTC - Matsugen.se</title>
    <meta charset="UTF-8">
    <meta name="description" content="Matsugen.se">
    <meta name="viewport" content="width=device-width, initial-scale=0.9">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../rtc/css/main.css">
    <link rel="icon" href="">
    <link rel="apple-touch-icon" href="">
    <script src="../rtc/js/jquery-3.2.1.js"></script>
    <script src="../staticalVariables/REST.js"></script>
    <script src="../rtc/js/includes.js"></script>
    <script src="../rtc/js/index.js"></script>
</head>
<body>
<div class="body" id="logInBody">
    <div id="logInLogoDiv">
        <img src="../rtc/img/Matsugen_logo.png">
    </div> 
    <div id="logInFormDiv" class="formDiv">
        <input class=" txt20 txtInput txtInputLogin " id="usernameTxt" placeholder="Användarnamn" type="text">
        <input class=" txt20 txtInput txtInputLogin " id="passwordTxt" placeholder="Lösenord" type="password">
        <button id="logInBtn" class="submitBtn" onclick=" logIn()">Logga in</button>
        <!--p class="txt20 txtOrange" onclick="forgottenPassword()">Glömt lösenord?</p-->
    </div>
    <div id="forgotFormDiv" class="formDiv">
        <input class="txt20 txtInput txtInputLogin" id="forgotUsername" placeholder="Email" type="text">
        <button id="logInBtn" class="submitBtn" onclick="sendNewPassword()">Återställ</button>
        <p class="txt20 txtOrange" onclick="redirectToLogIn()">Logga in</p>
    </div>
</div>
</body>
</html>
<?php
}
?>
