
// when user clicks login button this functions run
$(function () {
    $("#loginWithAjax").click(function () {
        if (loginValidation() == true) {
            var userNameBox = document.getElementById("loginUserNameId");
            var passwordBox = document.getElementById("loginPasswordId");
            var formError = document.getElementById("loginErrorsModal");

            userNameBox.style.border = "";
            passwordBox.style.border = "";

            formError.style.color = "red";
            formError.innerText = "";

            var userName = userNameBox.value;
            var password = passwordBox.value;

            ajax = new XMLHttpRequest();

            // Configure - Get Request, Destination Page, true = Asynchronous
            ajax.open("POST", "phpPages/API.php?command=login&userName=" + userName + "&password=" + password, true);

            // Which function to call on any change: 
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        var respondParse = JSON.parse(ajax.responseText);
                        if (respondParse.message == "Sucsess") {
                            window.location.href = "index.php";
                        }
                        if (respondParse.message !== "Sucsess") {
                            document.getElementById("loginErrorsModal").innerHTML = respondParse.message;
                        }
                    }
                }
            }
            ajax.send();
        }
    });

});
//login validation 
function loginValidation() {

    var userNameBox = document.getElementById("loginUserNameId");
    var passwordBox = document.getElementById("loginPasswordId");
    var formError = document.getElementById("loginErrorsModal");

    userNameBox.style.border = "";
    passwordBox.style.border = "";

    formError.style.color = "red";
    formError.innerText = "";

    var userName = userNameBox.value;
    var password = passwordBox.value;


    if (userName == "") {
        formError.innerText = "enter user name!";
        userNameBox.style.border = "1px red solid ";
        userNameBox.focus();
        return false;
    }

    if (password == "") {
        formError.innerText = "enter password!";
        passwordBox.style.border = "1px red solid ";
        passwordBox.focus();
        return false;
    }

    return true;
}





