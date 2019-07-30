<?php
function logIn($username){

    session_start();
    $_SESSION['5003298870'] = $username;
}
/*
function logOut(){
    if(isset($_COOKIE[session_name()])){
        session_destroy();
        setcookie(session_name(), '', time()-7000000, '/');
        unset($_SESSION['5003298870']);
    }
}*/


$_logInId = $_POST['logInId'];
//$_logOut = $_POST['logOut'];

if(isset($_logInId)){
    logIn($_logInId);
}
/*elseif(isset($_logOut)) {
    logOut();
*/
