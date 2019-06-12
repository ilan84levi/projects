const models = require("../models");

const Product = models.Product;
const Category = models.Category;

function getAllCategories() {
    return new Promise((resolve, reject) => {
        Category.find({}, (err, categories) => {
            if (err) {
                reject(err);
            } else {
                resolve(categories);
            }
        });
    });
}

function getAllProducts() {
    return new Promise((resolve, reject) => {
        Product.find({}).populate("categoryName").exec((err, products) => {
            if (err) {
                reject(err);
            } else {
                resolve(products);
            }
        });
    });
}

//  get all products by category
function getAllProductsByCategory(id) {
    return new Promise((resolve, reject) => {
        Product.find({
            categoryName: id
        }).populate("categoryName").exec((err, products) => {
            if (err) {
                reject(err);
            } else {
                resolve(products);
            }
        });
    });
}

//  get all products by SEARCH STRING
function productsSearch(productName) {
    console.log(productName)
    return new Promise((resolve, reject) => {
        productName = new RegExp('.*' + productName + '.*', 'i')
            Product.find({productName: productName}).populate("categoryName").exec((err, products) => {
                    if (err) {
                        console.log(err)
                        reject(err);
                    } else {
                        console.log(products)
                        resolve(products);
                    }
                });
            });
    }

    function addProduct(product) {
        return new Promise((resolve, reject) => {
            const productAdded = new Product(product);
            productAdded.save((err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }

    function updatePartialProduct(product) {
        return new Promise((resolve, reject) => {
            const productUpdated = new Product(product);
            Product.findOneAndUpdate({
                _id: product._id
            }, productUpdated, {
                new: true
            }, (err, productUpdated) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(productUpdated);
                    console.log(productUpdated)
                }
            });
        });
    }

    module.exports = {
        getAllProducts,
        addProduct,
        getAllCategories,
        getAllProductsByCategory,
        updatePartialProduct,
        productsSearch
    };