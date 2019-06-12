const express = require("express");
const cartLogic = require("../logics/shoppingCart-logic");
const router = express.Router();

// GET ALL CARTS 
router.get("/", async (request, response) => {
    try {
        _id = request.params._id;
        const cart = await cartLogic.getAllCarts();
        response.json(cart);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// GET ONE CARTS BY ID OF CUSTOMER
router.get("/:_id", async (request, response) => {
    try {
        _id = request.params._id;
        const cart = await cartLogic.getCartsById(_id);
        response.json(cart);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// GET ONE CART BY ID OF CART
router.get("/:_id", async (request, response) => {
    try {
        _id = request.params._id;
        const cart = await cartLogic.getOneCartById(_id);
        response.json(cart);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// ADD ONE CART
router.post("/", async (request, response) => {
    try {
        const cartToAdd = request.body;
        const cartFromBody = await cartLogic.addCart(cartToAdd);
        response.status(200).json(cartFromBody);
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;