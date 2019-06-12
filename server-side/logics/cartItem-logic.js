const models = require("../models");
const CartItem = models.CartItem;

 // GET ALL ITEMS
function getAllItems() {
    return new Promise((resolve, reject) => {
        CartItem.find({} , (err, items) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(items);
            }
        });
    });
}

function getAllCartItemsByCartId(_id) {
    return new Promise((resolve, reject) => {
        CartItem.find({cartId:_id}).populate("productId").exec((err, carts) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(carts);
            }
        });
    });
}

// POST CART ITEM
function addCartItem(item) {
    return new Promise((resolve, reject) => {
        const cartitem = new CartItem(item);
        cartitem.save((err, cartitems) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(cartitems);
            }
        });
    });
}

// delete one item from a cart
function deleteOneCartItem(_id) {
    return new Promise((resolve, reject) => {
        CartItem.deleteOne({_id} , (err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
}

// remove all items from a cart
function deleteAllCartItems(_id) {
    return new Promise((resolve, reject) => {
        CartItem.deleteMany({cartId:_id} , (err, info) => {
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
    getAllItems,
    addCartItem,
    deleteOneCartItem,
    getAllCartItemsByCartId,
    deleteAllCartItems
};








