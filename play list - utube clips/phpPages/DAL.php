<?php

//open connection
function connect() {
    $connection = mysqli_connect("localhost", "root", "", "playlist");
    return $connection;
}

//insert
function insert($sql) {
    $connection = connect();
    mysqli_query($connection, $sql);
    mysqli_close($connection);
}

//update
function update($sql) {
    $connection = connect();
    mysqli_query($connection, $sql);
    mysqli_close($connection);
}

//delete
function delete($sql) {
    $connection = connect();
    mysqli_query($connection, $sql);
    mysqli_close($connection);
}

//select
function select($sql) {
    $connection = connect();
    $table = mysqli_query($connection, $sql);

    $obj = mysqli_fetch_object($table);
    $arr = array();
    while ($obj != null) {
        $arr[] = $obj;
        $obj = mysqli_fetch_object($table);
    }
    mysqli_close($connection);
    return $arr;
}

// Get object:
function get_object($sql) {
    $connection = connect();

    $result = mysqli_query($connection, $sql);
    $obj = mysqli_fetch_object($result);

    mysqli_close($connection);

    return $obj;
//        echo $obj;
}
