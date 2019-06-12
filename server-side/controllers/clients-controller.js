const express = require("express");
const clientsLogic = require("../logics/clients-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const clients = await clientsLogic.getAllClients();
        response.json(clients);
    } catch (err) {
        response.status(500).json(err);
    }
});

// GET ONE CUSTOMER
router.get("/:_id", async (request, response) => {
    try {
        _id = request.params._id;
        const client = await clientsLogic.getOneCustomer(_id);
        response.json(client);
    } catch (err) {
        response.status(500).json(err);
    }
});

// POST - add client 
router.post("/", async (request, response) => {
    try {
        const client = request.body;
        const clientAdded = await clientsLogic.addClient(client);
        response.status(200).json(clientAdded);
    } catch (err) {
        response.status(500).json(err);
    }
});

// get one customer - check if exist for LOGIN
router.post("/login", async (request, response) => {
    try {
        const customer = await clientsLogic.CheckCustomer(request.body);
        response.json(customer);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// router.post("/suppliers", async (request, response) => {
//     try {
//         const supplier = request.body;
//         const supplierAdded = await suppliersLogic.addSupplier(supplier);
//         response.json(supplierAdded);
//     }
//     catch (error) {
//         response.status(500).json(error);
//     }
// });

module.exports = router;