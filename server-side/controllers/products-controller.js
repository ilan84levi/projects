const express = require("express");
const productsLogic = require("../logics/products-logic");
const multer = require("multer");
const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../supermarket/src/assets/images')
    },
    filename: function (req, file, cb) {
        cb(null , new Date().getTime() + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

// get all categories
router.get("/list" , async (request , response) => {
    try{
        const categories = await productsLogic.getAllCategories();
        response.json(categories);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// get all products
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// get All Products By Category
router.get("/:id", async (request, response) => {
    try {
        id = request.params.id;
        const products = await productsLogic.getAllProductsByCategory(id);
        response.json(products);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// get All Products BY SEARCH STRING
router.get("/search/:productSearch", async (request, response) => {
    try {
        let product = request.params.productSearch;
        const products = await productsLogic.productsSearch(product);
        response.json(products);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

router.post("/", upload.single("productImage") ,async (request, response) => {
    try {
        const product = request.body;
        product.productImage = request.file.filename ;
        const productAdded = await productsLogic.addProduct(product);
        response.status(200).json(productAdded);
    } catch (err) {
        response.status(500).json(err);
    }
});

router.patch("/:_id", upload.single("productImage"), async (request, response) => {
    try {
        const product = request.body;
        product._id = request.params._id;
        if(request.file !== undefined){
            product.productImage = request.file.path
        }

        const productUpdate = await productsLogic.updatePartialProduct(product);
        response.status(200).json(productUpdate);
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;