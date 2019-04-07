var ajax;
//validate inputs on register
function validation() {
    var firstNameBox = document.getElementById("firstName");
    var lastNameBox = document.getElementById("lastName");
    var userNameBox = document.getElementById("userName");
    var passwordBox = document.getElementById("password");
    var repasswordBox = document.getElementById("repassword");
    var formError = document.getElementById("registerErrorMessage");

    firstNameBox.style.border = "";
    lastNameBox.style.border = "";
    userNameBox.style.border = "";
    passwordBox.style.border = "";
    repasswordBox.style.border = "";
    formError.style.color = "red";
    formError.innerText = "";

    var firstName = firstNameBox.value;
    var lastName = lastNameBox.value;
    var userName = userNameBox.value;
    var password = passwordBox.value;
    var repassword = repasswordBox.value;

    if (firstName == "") {
        formError.innerText = "enter first name!";
        firstNameBox.style.border = "1px red solid ";
        return false;
    }

    if (firstName.length < 2) {
        formError.innerText = "first name must be at least 2 letters";
        firstNameBox.style.border = "1px red solid ";
        firstNameBox.focus();
        return false;
    }

      if (firstName == firstName.match(/^\d+$/)) {
           formError.innerText = 'Please input alphabet characters only';
        firstNameBox.style.border = "1px red solid ";
        firstNameBox.focus();
        return false;
    }

    if (lastName == "") {
        formError.innerText = "enter last name!";
        lastNameBox.style.border = "1px red solid ";
        lastNameBox.focus();
        return false;
    }

    if (lastName.length < 2) {
        formError.innerText = "last name must be at least 2 letters long!";
        lastNameBox.style.border = "1px red solid ";
        lastNameBox.focus();
        return false;
    }
    
       if (lastName == lastName.match(/^\d+$/)) {
        formError.innerText = "Please input alphabet characters only!";
        lastNameBox.style.border = "1px red solid ";
        lastNameBox.focus();
        return false;
    }

    if (userName == "") {
        formError.innerText = "enter user name!";
        userNameBox.style.border = "1px red solid ";
        userNameBox.focus();
        return false;
    }

    if (userName.length < 4) {
        formError.innerText = "user name must be at least 4 letters long!";
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

    if (password.length < 4) {
        formError.innerText = "password must be at least 4 letters long";
        passwordBox.style.border = "1px red solid ";
        passwordBox.focus();
        return false;
    }

    if (password !== repassword) {
        formError.innerText = "password doesnt match! , please re enter ";
        repasswordBox.style.border = "1px red solid ";
        repasswordBox.focus();
        return false;
    }

    return true;
}

////this function run when a user clicks the register button 
//if validation returns true the function send the values to api
function register() {

    if (validation() == true) {

        var firstNameBox = document.getElementById("firstName");
        var lastNameBox = document.getElementById("lastName");
        var userNameBox = document.getElementById("userName");
        var passwordBox = document.getElementById("password");

        firstNameBox.style.border = "";
        lastNameBox.style.border = "";
        userNameBox.style.border = "";
        passwordBox.style.border = "";

        var firstName = firstNameBox.value;
        var lastName = lastNameBox.value;
        var userName = userNameBox.value;
        var password = passwordBox.value;

        ajax = new XMLHttpRequest();

        // Configure - Get Request, Destination Page, true = Asynchronous
        ajax.open("POST", "phpPages/API.php?command=registeration&firstName=" + firstName
                + "&lastName=" + lastName + "&userName=" + userName + "&password=" + password, true);

        // Which function to call on any change: 
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    if ((ajax.responseText != "undefined") && (ajax.responseText != "")) {
                        var errors = JSON.parse(ajax.responseText);
                        if (errors.message == "header") {
                            window.location.href = "index.php";
                        } else {  
                            document.getElementById("registerErrorMessage").innerHTML = errors.message;
                        }
                    }

                }
                  alert(response.message);
                // Display the error: 
                alert(ajax.status + " --> " + ajax.statusText);
            }
        };

        ajax.send();
    }
}

