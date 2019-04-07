<?php

class playList {

    public $categoryName;
    public $name;
    public $Description;
    public $videoLink;
    public $id;
    public $categoryID;
    public $userName;
    

    public function __construct($categoryName, $name, $Description, $videoLink, $id, $categoryID, $userName) {
        $this->categoryName = $categoryName;
        $this->name = $name;
        $this->Description = $Description;
        $this->videoLink = $videoLink;
        $this->id = $id;
        $this->categoryID = $categoryID;
        $this->userName = $userName;
        
    }

}



