<?php

session_start();
require_once 'BLL.php';
require_once 'loginErors.php';
require_once 'errors.php';

$command = $_REQUEST["command"];

switch ($command) {

    case "registeration":

        $firstName = $_REQUEST["firstName"];
        $lastName = $_REQUEST["lastName"];
        $userName = $_REQUEST["userName"];
        $password = $_REQUEST["password"];

        if ($firstName == "" || $firstName == NULL || (!isset($firstName))) {
            $errorsFirstName = new errors("Missing FirstName!", 400);
            echo json_encode($errorsFirstName);
            break;
        }

        if (strlen($firstName) < 2) {
            $errorsFirstName = new errors("first name must be at least 2 letters long!", 400);
            echo json_encode($errorsFirstName);
            break;
        }


        if ($lastName == "" || $lastName == NULL || (!isset($lastName))) {
            $errorsLastName = new errors("Missing lastName!", 400);
            echo json_encode($errorsLastName);
            break;
        }

        if (strlen($lastName) < 2) {
            $errorsLastName = new errors("lastName name must be at least 2 letters long!", 400);
            echo json_encode($errorsLastName);
            break;
        }

        if ($userName == "" || $userName == NULL || (!isset($userName))) {
            $errorsUserName = new errors("Missing User Name!", 400);
            echo json_encode($errorsUserName);
            break;
        }

        if (strlen($userName) < 4) {
            $errorsUserName = new errors("User Name must be at least 4 letters long!!", 400);
            echo json_encode($errorsUserName);
            break;
        }

        if ($password == "" || $password == NULL || (!isset($password))) {
            $errorspassword = new errors("Missing password!", 400);
            echo json_encode($errorspassword);
            break;
        }

        if (strlen($password) < 4) {
            $errorspassword = new errors("password must be at least 4 letters long!", 400);
            echo json_encode($errorspassword);
            break;
        }

        if (is_user_exist($userName, $password)) {
            $erroruserNameExist = new errors("user Name allready exist!", 400);
            echo json_encode($erroruserNameExist);
            break;
        } else {
            register($firstName, $lastName, $userName, $password);
            $_SESSION["userName"] = $userName;
            $location = new errors("header", 400);
            echo json_encode($location);
            break;
        }


    case "getPlayList":
        $userName = $_SESSION["userName"];
        $PlayList = getPlayList($userName);
        $json = json_encode($PlayList);
        echo $json;
        break;


    case "deleteVideo":
        $id = $_REQUEST["id"];
        deleteVideo($id);
        break;

    case "login":
        $userName = $_REQUEST["userName"];
        $password = $_REQUEST["password"];

        if ($userName == "" || $userName == NULL || (!isset($userName))) {
            $errorsUserNameMissing = new loginErors("Missing User Name!", 400);
            echo json_encode($errorsUserNameMissing);
            break;
        }

        if ($password == "" || $password == NULL || (!isset($password))) {
            $errorspasswordMissing = new loginErors("Missing password!", 400);
            echo json_encode($errorspasswordMissing);
            break;
        }

        if (is_user_exist($userName, $password)) {
            $_SESSION["userName"] = $userName;
            $usernameSucsess = new loginErors("Sucsess", 400);
            echo json_encode($usernameSucsess);
            break;
        } else {
            $usernameNotExist = new loginErors("user name not Exist!", 400);
            echo json_encode($usernameNotExist);
            break;
        }

    case "logout":
        session_destroy();
        header("Location: Login.php");
        break;

    case "getCatergories":
        $categories = getCatergories();
        $json = json_encode($categories);
        echo $json;
        break;

    case "addVideo":
        $categoryID = $_REQUEST["category"];
        $name = $_REQUEST["moviename"];
        $Description = $_REQUEST["Description"];
        $videoLink = $_REQUEST["videoLink"];
        $userName = $_REQUEST["userName"];

        if ($name == "" || $name == NULL || (!isset($name))) {
            $errorsaddVideoName = new errors("Missing Name!", 400);
            echo json_encode($errorsaddVideoName);
            break;
        }


        //optionall
//        if ($Description == "" || $Description == NULL || (!isset($Description))) {
//            $errorsAddDescriptionMain = new errors("Missing Discription!", 400);
//            echo json_encode($errorsAddDescriptionMain);
//            break;
//        }

        if ($videoLink == "" || $videoLink == NULL || (!isset($videoLink))) {
            $errorsvideoLinkMain = new errors("Missing videoLink!", 400);
            echo json_encode($errorsvideoLinkMain);
            break;
        }
        if (!filter_var($videoLink, FILTER_VALIDATE_URL)) {
            $errorsvideoLinkMain = new errors("video Link isnt legal!", 400);
            echo json_encode($errorsvideoLinkMain);
            break;
        } else {
            addVideo($categoryID, $name, $Description, $videoLink, $userName);
            $videoaddedSuccses = new errors("succses", 400);
            echo json_encode($videoaddedSuccses);
            break;
        }


    case "updateVideo":
        $name = $_REQUEST["moviename"];
        $Description = $_REQUEST["Description"];
        $videoLink = $_REQUEST["videoLink"];
        $categoryID = $_REQUEST["category"];
        $id = $_REQUEST["id"];

        if ($name == "" || $name == NULL || (!isset($name))) {
            $errorsonUpdate = new errors("Missing Name!", 400);
            echo json_encode($errorsonUpdate);
            break;
        }

        // optionall
//        if ($Description == "" || $Description == NULL || (!isset($Description))) {
//            $errorsonUpdate = new errors("Missing Discription!", 400);
//            echo json_encode($errorsonUpdate);
//            break;
//        }

        if ($videoLink == "" || $videoLink == NULL || (!isset($videoLink))) {
            $errorsonUpdate = new errors("Missing videoLink!", 400);
            echo json_encode($errorsonUpdate);
            break;
        }

        if (!filter_var($videoLink, FILTER_VALIDATE_URL)) {
            $errorsvideoLinkMain = new errors("video Link isnt legal! make sure there are no blank spaces", 400);
            echo json_encode($errorsvideoLinkMain);
            break;
        } else {
            updateVideo($name, $Description, $videoLink, $categoryID, $id);
            $errorsonUpdate = new errors("sucsess", "400");
            echo json_encode($errorsonUpdate);
            break;
        }

    case "serchSql":
        $userName = $_SESSION["userName"];
        $serchValue = $_REQUEST["serchValue"];
        $serchSqls = serchSql($userName, $serchValue);
        $json = json_encode($serchSqls);
        echo $json;
        break;
}
?>