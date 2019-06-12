const express = require("express");
const cartItemLogic = require("../logics/cartItem-logic");

const router = express.Router();


// GET ALL ITEMS
router.get("/", async (request, response) => {
    try {
        const items = await cartItemLogic.getAllItems()
        response.json(items);
    }
    catch (err) {
        response.status(500).json(err);
    }
});


// GET ALL ITEMS IN CART BY ID OF CART
router.get("/:_id", async (request, response) => {
    try {
        _id = request.params._id;
        const cart = await cartItemLogic.getAllCartItemsByCartId(_id);
        response.json(cart);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// ADD CART ITEM
router.post("/", async (request, response) => {
    try {
        const item = request.body;
        const cartItems = await cartItemLogic.addCartItem(item);
        response.status(200).json(cartItems);
    }
    catch (err) {
        response.status(500).json(err);
    }
});


// add one item to a cart



// delete one item from a cart
router.delete("/:_id", async (request, response) => {
    try {
        await cartItemLogic.deleteOneCartItem(request.params._id);
        response.status(200).json({
            message:"item deleted",
            url:"http://localhost:3000/api/cartItems"
        });
    } catch (err) {
        response.status(500).json(err);
    }
});

// remove all items from a cart
router.delete("/deleteall/:_id", async (request, response) => {
    try {
        _id = request.params._id
        await cartItemLogic.deleteAllCartItems(_id );
        response.status(200).json({
            message:"items deleted",
            url:"http://localhost:3000/api/cartItems"
        });
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;