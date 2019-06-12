const express = require("express");
const adminLogic = require("../logics/admin-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const admins = await adminLogic.getAllAdmins();
        response.json(admins);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// get one admin
router.get("/:_id", async (request, response) => {
    try {
        _id = request.params._id;
        const admin = await adminLogic.getOneAdmin(_id);
        response.json(admin);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

// get one admin - check if exist
router.post("/login", async (request, response) => {
    try {
        const admin = await adminLogic.CheckAdmin(request.body);
        response.json(admin);
    }
    catch (err) {
        response.status(500).json(err);
    }
});

router.post("/", async (request, response) => {
    try {
        const admin = request.body;
        const adminAdded = await adminLogic.addAdmin(admin);
        response.status(200).json(adminAdded);
    } catch (err) {
        response.status(500).json(err);
    }
});

// update admin
router.put("/:_id", async (request, response) => {
    try {
        const admin = request.body;
        admin._id = request.params._id;
        const adminUpdate = await adminLogic.updateAdmin(admin);
        response.status(200).json(adminUpdate);
    } catch (err) {
        response.status(500).json(err);
    }
});

// patch - partial update
router.patch("/:_id", async (request, response) => {
    try {
        const admin = request.body;
        admin._id = request.params._id;
        const adminUpdate = await adminLogic.updatePartialAdmin(admin);
        response.status(200).json(adminUpdate);
    } catch (err) {
        response.status(500).json(err);
    }
});

// delete
router.delete("/:_id", async (request, response) => {
    try {
        await adminLogic.deleteAdmin(request.params._id);
        response.status(200).json({
            message:"admin deleted",
            url:"http://localhost:3000/api/admin"
        });
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;