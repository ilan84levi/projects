<?php

require_once 'DAL.php';
require_once 'playList.php';
require_once 'category.php';

function register($firstName, $lastName, $userName, $password) {

    $userName = addslashes($userName);
    $password = addslashes($password);

    $password = crypt($password, "my site"); // Salt the password.
    $password = sha1($password);

    $sql = "INSERT INTO users_details (firstName,lastName,userName,password)"
            . " VALUES('$firstName', '$lastName','$userName','$password')";
    insert($sql);
}

function getPlayList($userName) {
    $sql = "SELECT categoryName, name, Description, videoLink,videolist.id as id,category.categoryID as categoryID, videolist.userName AS userName FROM videolist JOIN category ON category.categoryID = videolist.categoryID JOIN users_details ON users_details.userName = videolist.userName WHERE users_details.userName ='$userName'";
    $playLists = select($sql);
    $playListByUser = array();
    foreach ($playLists as $p) {
        $playListByUser[] = new playList($p->categoryName, $p->name, $p->Description, $p->videoLink, $p->id, $p->categoryID, $p->userName);
    }
    return $playListByUser;
}

function is_user_exist($userName, $password) {
    $userName = addslashes($userName);
    $password = addslashes($password);

    $password = crypt($password, "my site"); // Salt the password.
    $password = sha1($password);


    $sql = "select count(*) as total_rows from users_details where userName = '$userName' and password = '$password'";
    $count = get_object($sql)->total_rows;
//    echo $count;
    return $count > 0;
}

//insert data
function addVideo($category, $name, $Description, $videoLink, $userName) {
    $name = addslashes($name);
    $Description = addslashes($Description);
    $videoLink = addslashes($videoLink);

    $sql = "INSERT INTO videolist(categoryID,name,Description,videoLink,userName) VALUES('$category','$name','$Description','$videoLink', '$userName')";
    insert($sql);
}

function getCatergories() {
    $sql = "SELECT categoryID, categoryName FROM `category`";

    $categories = select($sql);

    foreach ($categories as $c) {
        $categoryArr[] = new category($c->categoryID, $c->categoryName);
    }
    return $categoryArr;
}

function deleteVideo($id) {
    $sql = "DELETE FROM videolist WHERE id = '$id'";
    delete($sql);
}

//update data
function updateVideo($name, $description, $videoLink, $catagory, $id) {
    $name = addslashes($name);
    $description = addslashes($description);
    $videoLink = addslashes($videoLink);
    $sql = "update videolist SET  name = '$name', description = '$description' , videoLink = '$videoLink' , categoryID = '$catagory' where id = '$id'";
    update($sql);
}

//serch
function serchSql($userName, $serchValue) {
    $userName = addslashes($userName);
    $serchValue = addslashes($serchValue);

    $sql = "SELECT categoryName, name, Description, videoLink,videolist.id as id,category.categoryID as categoryID, videolist.userName FROM videolist JOIN category ON category.categoryID = videolist.categoryID WHERE videolist.userName ='$userName' and (categoryName LIKE '%$serchValue%' OR name LIKE '%$serchValue%' OR Description LIKE '%$serchValue%') ";
    $playLists = select($sql);
    return $playLists;
}
