$(document).ready(function() {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("user");
    localStorage.removeItem("key");
    deleteCookie("loggedIn");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("key");
    sessionStorage.removeItem("loggedIn");
});
