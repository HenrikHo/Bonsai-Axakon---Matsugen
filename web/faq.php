<?php
//session_start();
if(!isset($_SESSION['5029893130']) && isset($_COOKIE['loggedIn'])){
    setcookie('loggedIn', "", time()-7000000, "/");
    unset($_COOKIE['loggedIn']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Matsugen - Frågor och svar</title>
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
    <script src="js/faq.js"></script>
</head>

<header class="header">
    <?php include('includes/menu.php');?>
</header>
<body class="hideSideBar noScroll">
<div id="contactWrapper">
    <div class="centerTxtWrapper" id="faqUpperWrapper">
        <h1>Frågor och svar!</h1>
        <div class="noScroll" id="faqDiv">
            <ul class="faqQuestionsList">
                <li class="faqQuestion" id="q1"> Hur får jag min mat?
                </li>
                <li class="faqAnswer"  id="a1"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion"  id="q2"> Kan jag beställa mat från en annan stad?
                </li>
                <li class="faqAnswer"  id="a2"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion"  id="q3"> Hur fungerar betalningen, kan jag betala kontant?
                </li>
                <li class="faqAnswer"  id="a3"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion" id="q4"> Kan jag beställa bord via Matsugen?
                </li>
                <li class="faqAnswer" id="a4"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion" id="q5"> Kan jag registera en restaurang som inte är med i Matsugen?
                </li>
                <li class="faqAnswer"  id="a5"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion"  id="q6"> Finns Mcdonalds med i Matsugen?
                </li>
                <li class="faqAnswer"  id="a6"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion" id="q7"> Hur skapar jag en användare?
                </li>
                <li class="faqAnswer" id="a7"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion" id="q8"> Hur lång tid kan jag förvänta mig att det tar för min mat att komma fram ?
                </li>
                <li class="faqAnswer"  id="a8"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion"  id="q9"> Finns det veganska/vegetariska/glutenfria alternativ?
                </li>
                <li class="faqAnswer"  id="a9"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion" id="q10"> Cookies
                </li>
                <li class="faqAnswer" id="a10"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion" id="q11"> Hur många adresser kan jag registera på min användare?
                </li>
                <li class="faqAnswer"  id="a11"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
                <li class="faqQuestion"  id="q12"> Kan jag beställa mat från en bensin mack ?
                </li>
                <li class="faqAnswer"  id="a12"> Lorem ipsum dolor sit amet, vix purto dignissim assueverit in, docendi deseruisse concludaturque eam eu, ea alienum pertinax reprehendunt usu. In pro oportere evertitur, eu pro vocent inermis, voluptua invidunt scriptorem mei ut. Velit mucius persecuti cu sit, eu vix mundi recusabo persecuti. Ubique putent tractatos te ius. Eum wisi modus eu, eu pro dico adipiscing, vel malorum tacimates scriptorem ne. Mei te altera labore aeterno.
                </li>
            </ul>
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

