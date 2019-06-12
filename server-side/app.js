const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const productsController = require("./controllers/products-controller");
const clientsController = require("./controllers/clients-controller");
const adminController = require("./controllers/admin-controller");
const fileController = require("./controllers/file-controller");
const shoppingCartController = require("./controllers/shoppingCart-Controller");
const orderController = require("./controllers/order-Controller");
const cartItemController = require("./controllers/cartItem-Controller");

const server = express();

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());
server.use(express.json());
server.use(cors());

// PREVENT CORS HEADERS ERRORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin , Content-Type , Accept , Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json();
    }
    next();
});

//public folder 
server.use('../supermarket/src/assets/images', express.static('images'));

server.use("/api/categories", productsController);
server.use("/api/products", productsController);
server.use("/api/customers", clientsController);
server.use("/api/admin", adminController);
server.use("/api/uploadphoto", fileController);
server.use("/api/carts" , shoppingCartController);
server.use("/api/cartItems" , cartItemController);
server.use("/api/orders" , orderController);

server.use((req, res, next) => {
    const error = new Error('NOT FOUND');
    error.status = 404;
    next(error);
});

server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

server.get("*", (request, response) => {
    response.status(404).json({
        message: "Route not found."
    });
});

const port = 3000;

server.listen(port, () => {
    console.log("Listening on http://localhost:3000");
});