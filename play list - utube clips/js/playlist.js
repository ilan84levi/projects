var ajax;
//this function sends a request to get the info from database for the table   
function showPlayList() {
    var userName = document.getElementById("userNamePlaylist").innerHTML;

    ajax = new XMLHttpRequest();

    // Configure - Get Request, Destination Page, true = Asynchronous
    ajax.open("GET", "API.php?command=getPlayList&userName=" + userName, true);

    // Which function to call on any change: 
    ajax.onreadystatechange = createUI;

    // Create the request:
    ajax.send();
}
//this function creates the table on myplaylist page 
function createUI() {

    // ajax.readyState = 4 ==> Data got from the server:
    if (ajax.readyState === 4) {

        // If there is no error:
        if (ajax.status === 200) {
            console.log(ajax.responseText);
            // Convert AJAX string into a real array:
            var playList = JSON.parse(ajax.responseText);
//console.log(playList);
            if (Array.isArray(playList)) {
                var table = "<table class='table'><thead class='thead-dark'><th scope='col'>category</th><th scope='col'>Name</th><th scope=col'>Description </th><th scope=col'>play</th><th>update</th scope=col><th scope=col>delete</th><th scope=col></th>";

                for (var i = 0; i < playList.length; i++) {
                    var tr = "<thead class='thead-light'><tr scope='row' id='row" + i + "'>" + "<td>" + playList[i].categoryName + "</td>" + "<td>"
                            + playList[i].name + "</td>" + "<td>" + playList[i].Description +
                            "</td>" + "<td data-toggle='modal' data-target='#playIt' onclick='playVideo(" + '\ " ' + playList[i].videoLink + '\ " ' + ")' class='playIt'>"
                            + "<i class='fas fa-play'></i>" + "</td>" + "<td onclick='editVideoModal(" + playList[i].categoryID + "," + '\ " ' + playList[i].videoLink + '\ " '
                            + "," + '\ " ' + playList[i].categoryName + '\ " ' + "," + '\ " ' + playList[i].name + '\ " ' + "," + '\ " ' +
                            playList[i].Description + '\ " ' + "," + +playList[i].id + ")' + ',' +  data-toggle='modal' data-target='#editVideo' '>" + "<i class='fas fa-pencil-alt'></i>" + "</td>" +
                            "<td onclick='deleteVideo(" + playList[i].id + ")' class='delete'>" +
                            "<i class='fas fa-trash-alt'></i>" + "</td>"+ "</tr></thead>";
                    table += tr;
                }
                table += "</table>";

                // Display the <th>:
                document.getElementById("userplayList").innerHTML = table;
                getCatergoriesUpdate();
            } else {
                alert(response.message);
                // Display the error: 
                alert(ajax.status + " --> " + ajax.statusText);
            }

        }

    }
}

//$(function () {
//     if (window.location.href.match('http://localhost/projectNum2/phppages/myPlayList.php') != null) {
//         $(window).on("load",showPlayList());
//  }
//});
//this function get the categories when a user click the update button
function getCatergoriesUpdate() {
//    alert("respons");
    ajax = new XMLHttpRequest();

//     Configure - Get Request, Destination Page, true = Asynchronous
    ajax.open("GET", "API.php?command=getCatergories", true);

//     Which function to call on any change: 
    ajax.onreadystatechange = categoriesUiPlaylist;

//     Create the request:
    ajax.send();
}
//this function show the categories and also save them to local storage
function categoriesUiPlaylist() {
    // ajax.readyState = 4 ==> Data got from the server:
    if (ajax.readyState === 4) {

        // If there is no error:
        if (ajax.status === 200) {

            // Convert AJAX string into a real array:
            var categories = JSON.parse(ajax.responseText);
            var catagoeyArray = [];
            var index = 0;
            if (Array.isArray(categories)) {

                for (var i = 0; i < categories.length; i++) {

                    var catagoryObj = {
                        categoryID: categories[i].categoryID,
                        categoryName: categories[i].categoryName
                    };
                    catagoeyArray.push(catagoryObj);

                }
                var jsonString = "jsonString" + index;
                jsonString = JSON.stringify(catagoeyArray);
                localStorage.setItem("category", jsonString);

            }
        }
    }
}


//play video button
function playVideo(link) {

    var videoBoard = document.getElementById("videoBoard");
    link = link.replace("watch?v=", "embed/");
    videoBoard.src = link;

    $('.close').click(function () {
        $('.modal-body').children('iframe').attr('src', '');
        $('.popup-bg').fadeOut();
    });

    $(document).ready(function () {
        $(window).click(function () {
            $('.modal-body').children('iframe').attr('src', '');
            location.reload();
        });
    });

}


//this function for the delete button
function deleteVideo(id) {
    if (confirm("are you sure?") == true) {

        ajax = new XMLHttpRequest();

        // Configure - Get Request, Destination Page, true = Asynchronous
        ajax.open("GET", "../phpPages/API.php?command=deleteVideo&id=" + id, true);

        // Which function to call on any change: 
        ajax.onreadystatechange = showPlayList;

        // Create the request:
        ajax.send();
    }
}


//this function shows the values on the modal when a user clicks update button
function editVideoModal(categoryId, videoLink, category, name, Description, id) {
    getCatergoriesUpdate();

    document.getElementById("moviename").value = name;
    document.getElementById("Description").value = Description;
    document.getElementById("videoLink").value = videoLink;
    document.getElementById("videoId").value = id;
    var jsonString = localStorage.getItem("category");
    var catagoryArray = JSON.parse(jsonString);

    var categorySelect = "<select id='categorySelect' class='custom-select'>" + "<option" + " " + "value='" + " " + categoryId + "'>" + category + "</option>";

    if (catagoryArray !== null) {
        for (var i = 0; i < catagoryArray.length; i++) {
            var option = "<option" + " " + "value='" + catagoryArray[i].categoryID + "'>" + catagoryArray[i].categoryName + "</option>"

            categorySelect += option;
        }

        categorySelect += "</select>";

        document.getElementById("categoryPlaylistUpdate").innerHTML = categorySelect;
    }

}

//this function is for updating video's
function editVideoToApi() {
    if (validateForUpdate() == "ok") {

        var idBox = document.getElementById("videoId");
        var categoryBox = document.getElementById("categorySelect");
        var movienameBox = document.getElementById("moviename");
        var DescriptionBox = document.getElementById("Description");
        var videoLinkBox = document.getElementById("videoLink");

        var category = categoryBox.value;
        var moviename = movienameBox.value;
        var Description = DescriptionBox.value;
        var videoLink = videoLinkBox.value;
        var id = idBox.value;
        ajax = new XMLHttpRequest();

        // Configure - Get Request, Destination Page, true = Asynchronous
        var url = "../phpPages/API.php?command=updateVideo&moviename=" + moviename + "&Description=" + Description +
                "&videoLink=" + videoLink + "&category=" + category + "&id=" + id;

        ajax.open("POST", url, true);

        // Which function to call on any change: 
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    var errorsOnUpdateResponse = JSON.parse(ajax.responseText);
                    if (errorsOnUpdateResponse.message == "sucsess") {
                        window.location.href = "myPlaylist.php";
                    }

                    if (ajax.responseText !== "sucsess") {
                        var errorsOnUpdateResponse = JSON.parse(ajax.responseText);
                        document.getElementById("updateMovieMessage").innerHTML = errorsOnUpdateResponse.message;
                    }

                }


            }

        }
        ajax.send();
    } else {
        return false;
    }
}

//this function is for the search on myplaylist page.
//make a search on mysql and show the resultes
$(document).ready(function () {
    $("#serchInSql").keyup(function () {
        var serchValue = $(this).val();
        if (serchValue == "") {
            showPlayList();
        } else {

            var url = "../phpPages/API.php?command=serchSql&serchValue=" + serchValue;
            ajax = new XMLHttpRequest();
            ajax.open("GET", url, true);

            // Which function to call on any change: 
            ajax.onreadystatechange = createUI;

            // Create the request:
            ajax.send();
        }
    });

});

//validation for update function
function validateForUpdate() {

    var movienameBox = document.getElementById("moviename");
//    var DescriptionBox = document.getElementById("Description");
    var videoLinkBox = document.getElementById("videoLink");

    var moviename = movienameBox.value;
//    var Description = DescriptionBox.value;
    var videoLink = videoLinkBox.value;
    var updateValidateMessage = document.getElementById("updateMovieMessage");
    movienameBox.style.border = "";
//    DescriptionBox.style.border = "";
    videoLinkBox.style.border = "";

    updateValidateMessage.innerHTML = "";

    if (moviename == "") {
        movienameBox.style.border = "2px solid red";
        updateValidateMessage.innerHTML = "name is empty!!";
        return false;
    }

//optional//
//    if (Description == "") {
//        DescriptionBox.style.border = "2px solid red";
//        updateValidateMessage.innerHTML = "Description is empty!!";
//        return false;
//    }

    if (videoLink == "") {
        videoLinkBox.style.border = "2px solid red";
        updateValidateMessage.innerHTML = "video Link is empty!!";
        return false;
    }

    if (videoLink.includes('https://www.youtube.com/watch?v=') == false) {
        videoLinkBox.style.border = "2px solid red";
        updateValidateMessage.innerHTML = "video Link is not valid!!";
        return false;
    }

    return "ok";
}
