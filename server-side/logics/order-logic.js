const models = require("../models");

const Order = models.Order;

function getAllOrders() {
    return new Promise((resolve, reject) => {
        Order.find({} , (err, orders) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(orders);
            }
        });
    });
}

// post
function addOrder(order) {
    return new Promise((resolve, reject) => {
        const orderAdded = new Order(order);
        orderAdded.save((err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
}

// GET ALL ORDERS BY CUSTOMER ID
function getAllOrdersByCustomerId(_id) {
    return new Promise((resolve, reject) => {
        Order.find({customerId:_id}, (err, orders) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(orders);
            }
        });
    });
}

module.exports = {
    getAllOrders,
    addOrder,
    getAllOrdersByCustomerId
};