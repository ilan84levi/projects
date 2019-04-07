<?php

class category {

    public $categoryID;
    public $categoryName;
 


    public function __construct($categoryID,$categoryName) {
        $this->categoryID = $categoryID;
        $this->categoryName = $categoryName;
    }

}
