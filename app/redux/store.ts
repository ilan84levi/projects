import { Product } from '../models/product'
import { Category } from '../models/category'
import { Customer } from '../models/customer';
import { Item } from '../models/item';
import { Admin } from '../models/admin';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shoppingCart';

export class Store {
    public isLoggedIn: boolean;
    public products: Product[];
    public product: Product;
    public categories: Category[];
    public customer: Customer;
    public customers: Customer[];
    public items: Item[];
    public admin: Admin[];
    public orders: Order[];
    public shppingCarts: ShoppingCart[];
    public productToUpdate: Product;
    public customerLoggedIn: boolean;
    public newCart: ShoppingCart;
    public cartId: any;
    public searchInputClass: any = "hidden";

    public constructor() {
        // admin  login and Logout
        if (sessionStorage.getItem("isLoggedIn") === "true") {
            this.isLoggedIn = true;
        }

        // customer login 
        if (sessionStorage.getItem("customerLoggedIn") === "true") {
            this.customerLoggedIn = true;
        }

        // customer  Logout
        if (sessionStorage.getItem("customerLoggedIn") === "false") {
            this.customerLoggedIn = false;
        }

    }

}