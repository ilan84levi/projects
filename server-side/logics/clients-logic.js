const models = require("../models");

const Client = models.Client;

function getAllClients() {
    return new Promise((resolve, reject) => {
        Client.find({}, (err, clients) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(clients);
            }
        });
    });
}

function getOneCustomer(_id) {
    return new Promise((resolve, reject) => {
        Client.findOne({_id} , (err, client) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(client);
            }
        });
    });
}

function addClient(client) {
    return new Promise((resolve, reject) => {
        const clientAdded = new Client(client);
        clientAdded.save((err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
}

//Check if customer exist
function CheckCustomer(request) {
    return new Promise((resolve, reject) => {
        Client.findOne({email: request.email, password: request.password}, (err, customer) => {
            if (err) return reject(err);
            if(!customer) return reject({message:"email or password is incorect"});      
             resolve(customer);
        });
    });
}

module.exports = {
    getAllClients,
    addClient,
    CheckCustomer,
    getOneCustomer
};

