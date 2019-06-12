const dal = require("./dal");
const mongoose = dal.mongoose;

//-------------------------------------------------------------------------------

// products categories
const CategorySchema = mongoose.Schema({
    name:{type:String, required:true}
});

const Category = mongoose.model("Category" , CategorySchema , "categories")

var imageSchema = mongoose.Schema({
    image: { data: Buffer, contentType: String }
});

var Img = mongoose.model('Img', imageSchema , "images");

// ----------------------------------------------------------------------------

// products
const productSchema = mongoose.Schema({
    productName: {type:String, required:true },
    categoryName:{type:mongoose.Schema.Types.ObjectId , ref:"Category" , required:true}, // forign key
    price: {type:Number, required:true , min:[0, 'must be more than 0 and less than 1000'] , max:1000},
    productImage:{type:String , required:true},
});


const Product = mongoose.model("Product", productSchema, "products");

// ---------------------------------------------------------------------------

// create schema of customer:
const clientSchema = mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    city:{type:String, required:true},
    street:{type:String, required:true},
    houseNumber:{type:String, required:true},
    password:{type:String, required:true},
});

const Client = mongoose.model("Client" , clientSchema , "clients" );

//--------------------------------------------------------------------------

// manger - admin
const mangerSchema = mongoose.Schema({
firstName: {type:String, required:false},
lastName:{type:String, required:false},
email:{type:String, required:true},
password:{type:String, required:true}
});

const Admin = mongoose.model("Admin" , mangerSchema , "admins");

//-------------------------------------------------------------------------------

// CART
const shoppingCartSchema = mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId , ref:"Client" , required:true}, // forign key
    date:{type:String , required:true}
});

const Cart = mongoose.model("Cart" , shoppingCartSchema , "ShoppingCarts");


// ---------------------------------------------------------------------------------

//  CART ITEM MODEL
const cartItemSchema = mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId , ref:"Product" , required:true}, // forign key
    amount:{type:Number,required:true , min:1 , max:1000},
    price:{type:Number,required:true , min:1 , max:1000},
    cartId:{type:mongoose.Schema.Types.ObjectId , ref:"Cart" , required:true}, // forign key
});

const CartItem = mongoose.model("CartItem" , cartItemSchema , "cartItems");

// -------------------------------------------------------------------------------

// ORDER MODEL
const orderSchema = mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId , ref:"Client" , required:true}, // forign key
    cartId:{type:mongoose.Schema.Types.ObjectId , ref:"Cart" , required:true}, // forign key
    price:{type:Number,required:false},
    city:{type:String,required:true},
    street:{type:String,required:true},
    houseNumber:{type:String,required:true},
    date:{type:String,required:false},
    creditCard:{type:String,  required:true}
});

const Order = mongoose.model("Order" , orderSchema , "Orders");

module.exports = {
    Product,
    Client,
    Admin,
    Category,
    Img,
    Cart,
    CartItem,
    Order
};

