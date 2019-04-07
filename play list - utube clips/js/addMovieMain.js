var ajax;

//this page made for button "add video" on the main page (index.php)

//this function get the categories 
function getCatergories() {

    ajax = new XMLHttpRequest();
    // Configure - Get Request, Destination Page, true = Asynchronous
    ajax.open("GET", "phpPages/API.php?command=getCatergories", true);
    // Which function to call on any change: 
    ajax.onreadystatechange = categoriesUi;
    // Create the request:
    ajax.send();
}
//this function display the categories 
function categoriesUi() {
// ajax.readyState = 4 ==> Data got from the server:
    if (ajax.readyState === 4) {

// If there is no error:
        if (ajax.status === 200) {

// Convert AJAX string into a real array:
            var categories = JSON.parse(ajax.responseText);
            if (Array.isArray(categories)) {
                var select = "<select id='categorySelect' class='custom-select'>";
                for (var i = 0; i < categories.length; i++) {
                    var option = "<option value='" + categories[i].categoryID + "'>" + categories[i].categoryName + "</option>";
                    select += option;
                }
                select += "</select>";
                document.getElementById("categoryDiv").innerHTML = select;
            }
        }
    }
}

//this function get the user inputes including categories from the mysql database and deliver everything to api 
//page
function addVideo() {
    if (validate() == "ok") {
        var userName = document.getElementById("userNameMain").innerText;
        var categoryBox = document.getElementById("categorySelect");
        var movienameBox = document.getElementById("moviename");
        var DescriptionBox = document.getElementById("Description");
        var videoLinkBox = document.getElementById("videoLink");
        var category = categoryBox.value;
        var moviename = movienameBox.value;
        var Description = DescriptionBox.value;
        var videoLink = videoLinkBox.value;

        ajax = new XMLHttpRequest();
        // Configure - Get Request, Destination Page, true = Asynchronous
        var url = "phpPages/API.php?command=addVideo&category=" + category + "&moviename=" + moviename +
                "&Description=" + Description + "&videoLink=" + videoLink + "&userName=" + userName;
        ajax.open("POST", url, true);
        // Which function to call on any change: 
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    if ((ajax.responseText != "undefined") && (ajax.responseText != "")) {
                        var errorsOnResponse = JSON.parse(ajax.responseText);
                        if (errorsOnResponse.message == "succses") {
                            window.location.href = "index.php";
                        } else {
                            document.getElementById("mainAddVideoMessage").innerHTML = errorsOnResponse.message;
                        }
                    }

                }

            }
        };
        // Create the request:
        ajax.send();
    } else {
        return false;
    }
}

//this function validates inputes
function validate() {

    var movienameBox = document.getElementById("moviename");
//    var DescriptionBox = document.getElementById("Description");
    var videoLinkBox = document.getElementById("videoLink");
    var addmovieFromMainMessage = document.getElementById("mainAddVideoMessage");

    var moviename = movienameBox.value;
//    var Description = DescriptionBox.value;
    var videoLink = videoLinkBox.value;
    movienameBox.style.border = "";
//    DescriptionBox.style.border = "";
    videoLinkBox.style.border = "";
    addmovieFromMainMessage.innerHTML = "";
    if (moviename == "") {
        movienameBox.style.border = "2px solid red";
        addmovieFromMainMessage.innerHTML = "name is empty!!";
        return false;
    }

//optionall//
//    if (Description == "") {
//        DescriptionBox.style.border = "2px solid red";
//        addmovieFromMainMessage.innerHTML = "Description is empty!!";
//        return false;
//    }

    if (videoLink == "") {
        videoLinkBox.style.border = "2px solid red";
        addmovieFromMainMessage.innerHTML = "video Link is empty!!";
        return false;
    }

    if (videoLink.includes('https://www.youtube.com/watch?v=') == false) {
        videoLinkBox.style.border = "2px solid red";
        addmovieFromMainMessage.innerHTML = "video Link is not valid!!";
        return false;
    }

    return "ok";
}