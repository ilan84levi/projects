<?php


class loginErors {

    public $message;
    public $status;

    public function __construct($message, $status) {
        $this->message = $message;
        $this->status = $status;
    }

}