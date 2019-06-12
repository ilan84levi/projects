const filesLogic = require("../logics/file-logic");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '-' + file.originalname )
    }
})

const fileFilter = (req,file,cb) => {
    
    if(file.mimetype === 'inage/jpeg' || file.mimetype === 'image/png'){
        // except a file
        cb(null,true)
    }else{
        // reject a file
        cb(null,false);
    }

};

const upload = multer({
    dest:'./uploads/',
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 30 // up to 30 MEGA
    },
    fileFilter:fileFilter
});

router.post("/", upload.single('picture'), async (request, response) => {
    try {
        let img = fs.readFile(req.file.path);
        const imgAdded = await filesLogic.uploadImage(img);
        response.status(201).json(imgAdded);
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;