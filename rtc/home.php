<?php

session_start();
if(isset($_SESSION['5003298870'])){?>
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
        <script src="../rtc/js/global.js"></script>
    </head>
    <body>
    <header class="header">
        <?php include('includes/menu.php');?>
    </header>
    <div class="body" id="homeBody"></div>
    <footer class='footer'>
        <?php include('includes/footer.html');?>
    </footer>
    </body>
    </html>
<?php
}
else{
    header("Location: ../rtc/index.php");
}
?>
