export enum ActionType {
    //category
    GetAllCategories,
    //customers
    AddCustomer,
    GetOneCustomer,
    loginCustomer,
    logOutCustomer,
    // items
    GetAllItems,
    GetOneItem,
    AddItem,
    DeleteItem,
    //mangers - admin
    loginAdmin,
    AddAdmin,
    adminLogout,
    // orders
    AddOrders,
    GetAllOrders,
    GetOneOrder,
    // products
    GetAllProducts,
    GetOneProduct,
    AddProduct,
    UpdateProduct,
    UpdatePartialProduct,
    getProductToUpdate,
    //shopping cart
    AddShoppingCart,
    GetAllShoppingCarts,
    GetOneShoppingCart,
    DeleteShoppingCart,
    UpdateShoppingCart,
    UpdatePartialShoppingCart,
    RemoveShoppingCart
}