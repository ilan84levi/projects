const express = require("express");
const orderLogic = require("../logics/order-logic");

const router = express.Router();

// GET ALL ORDERS
router.get("/", async (request, response) => {
    try {
        const orders = await orderLogic.getAllOrders();
        response.json(orders);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// GET ALL ORDERS BY CUSTOMER ID
router.get("/:_id", async (request, response) => {
    try {
        _id = request.params._id;
        const orders = await orderLogic.getAllOrdersByCustomerId(_id);
        response.json(orders);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// POST - ADD ORDER
router.post("/", async (request, response) => {
    try {
        const order = request.body;
        const orderAdded = await orderLogic.addOrder(order);
        response.status(200).json(orderAdded);
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;