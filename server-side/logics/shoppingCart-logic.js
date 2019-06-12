const models = require("../models");
const Cart = models.Cart;

// GET ALL SHOPPING CARTS
function getAllCarts() {
    return new Promise((resolve, reject) => {
        Cart.find({}).populate("Client").exec((err, carts) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(carts);
            }
        });
    });
}

// GET ONE SHOPPING CART BY ID OF CART
function getOneCartById(_id) {
    return new Promise((resolve, reject) => {
        Cart.find({customerId:_id}).populate("customerId").exec((err, carts) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(carts);
            }
        });
    });
}

// GET ONE SHOPPING CART BY ID OF CUSTOMER
function getCartsById(_id) {
    return new Promise((resolve, reject) => {
        Cart.find({_id:_id}).populate("customerId").exec((err, carts) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(carts);
            }
        });
    });
}

// ADD ONE CART
function addCart(cart) {
    console.log(cart)
    return new Promise((resolve, reject) => {
        const cartToAdd = new Cart(cart);
        cartToAdd.save((err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
}

module.exports = {
    getCartsById,
    getAllCarts,
    addCart,
    getOneCartById
};