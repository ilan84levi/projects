const models = require("../models");

const Admin = models.Admin;

function getAllAdmins() {
    return new Promise((resolve, reject) => {
        Admin.find({} , (err, admins) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(admins);
            }
        });
    });
}

function getOneAdmin(_id) {
    return new Promise((resolve, reject) => {
        Admin.findOne({_id} , (err, admin) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(admin);
            }
        });
    });
}

function addAdmin(admin) {
    return new Promise((resolve, reject) => {
        const adminAdded = new Admin(admin);
        adminAdded.save((err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
}

//update admin
function updateAdmin(admin) {
    return new Promise((resolve, reject) => {
        const adminUpdated = new Admin(admin);
        Admin.findOneAndUpdate({_id:admin._id}, adminUpdated,{new:true}, (err, adminUpdated) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(adminUpdated);
                // console.log(info)
            }
        });
    });
}

// update partial admin
function updatePartialAdmin(admin) {
    return new Promise((resolve, reject) => {
        const adminUpdated = new Admin(admin);
        Admin.findOneAndUpdate({_id:admin._id}, adminUpdated,{new:true}, (err, adminUpdated) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(adminUpdated);
                // console.log(info)
            }
        });
    });
}

//delete admin
function deleteAdmin(_id) {
    return new Promise((resolve, reject) => {
        Admin.deleteOne({_id}, (err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
}

//Check admin 
function CheckAdmin(request) {
    return new Promise((resolve, reject) => {
        Admin.findOne({email: request.email, password: request.password}, (err, admin) => {
            if (err) return reject(err);
            if(!admin) return reject({message:"email or password is incorect"});       
             resolve(admin);
        });
    });
}

module.exports = {
    getAllAdmins,
    addAdmin,
    getOneAdmin,
    updateAdmin,
    updatePartialAdmin,
    deleteAdmin,
    CheckAdmin
};

