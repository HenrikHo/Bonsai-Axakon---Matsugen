<?php
function logIn($username){
    session_start();
    $_SESSION['5029893130'] = $username;
}

function anonLogIn ($anonUser){
 /*if ($anonUser != "anonymous") {
        $_SESSION['5029893130'] = $anonUser;
    }*/

    if ($anonUser == "anonymous") {
        session_start();
        $_SESSION['anon'] = $anonUser;
    }
}


function logOut(){
    if(isset($_COOKIE[session_name()]) || isset($_SESSION['5029893130'])){
        session_destroy();
        setcookie(session_name(), "", time() - 7000000, "/");
        unset($_SESSION['5029893130']);
    }
}

$_logInId = $_POST['logInId'];
$_logOut = $_POST['logOut'];
$_anonId = $_POST['anonId'];


if(isset($_logInId)){
    logIn($_logInId);
}
elseif(isset($_logOut)) {
    logOut();
}
elseif(isset($_anonId)){
    anonLogIn($_anonId);
}
