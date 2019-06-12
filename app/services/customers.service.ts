import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from 'redux';
import { NgRedux } from 'ng2-redux';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { City } from '../models/city';
import { Customer } from '../models/customer';
import { ActionType } from '../redux/action-type';
import { ShoppingCart } from '../models/shoppingCart';
import { Item } from '../models/item';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    public isExisted;
    public customer = new Customer();
    public currentUser = new Customer();

    constructor(private httpClient: HttpClient, private router: Router, private redux: NgRedux<Store>) { }

    public getCitiesList(): Observable<City[]> {
        return this.httpClient.get<City[]>("/assets/json/cities.json");
    }

    public addCustomer(customer): Observable<Customer> {
        return this.httpClient.post<Customer>("http://localhost:3000/api/customers", customer);
    }

    public checkCredintialsForCustomer(customer): any {
        this.isExisted = this.httpClient.post<Customer>("http://localhost:3000/api/customers/login", customer)
        this.isExisted.subscribe(customer => {
            if (customer._id) {
                this.router.navigate(["home"]);
                sessionStorage.setItem("customerLoggedIn", "true");
                let action = { type: ActionType.loginCustomer };
                this.redux.dispatch(action);
                this.saveCustomerInStore(customer);
                return true
            }

            else {

                alert("Incorrect username or password :-(");
            }

        }, res => {
            alert(res.error.message)
        });

    }

    public saveCustomerInStore(customer): void {

        localStorage.setItem("customerId", JSON.stringify(customer._id));

        this.getCustomer(customer._id).subscribe(customer => {
            let action = { type: ActionType.GetOneCustomer, payload: customer };
            this.redux.dispatch(action);
        });

    }


    public addItemToCart(item): Observable<Item> {
        return this.httpClient.post<Item>("http://localhost:3000/api/cartItems", item)
    }

    public checkForCart(): any {

        let newShoppingCart = localStorage.getItem("newShoppingCart");
        if (newShoppingCart) {
            let cartId = JSON.parse(newShoppingCart)
            return this.httpClient.get<ShoppingCart>("http://localhost:3000/api/cartItems/" + cartId._id);
        }

    }

    public getOneCartByCartId(): any {

        let newShoppingCart = localStorage.getItem("newShoppingCart");
        if (newShoppingCart) {
            let cartId = JSON.parse(newShoppingCart)
            return this.httpClient.get<ShoppingCart>("http://localhost:3000/api/carts/" + cartId._id);
        }

    }

    public getCartItems(id): any {

        let cart = localStorage.getItem(id);
        return cart;

    }

    // get customer shopping cart
    public getCustomerShoppingCart(): Observable<ShoppingCart> {
        let customerCart = JSON.parse(localStorage.getItem("customerId"));
        return this.httpClient.get<ShoppingCart>("http://localhost:3000/api/carts/" + customerCart);
    }

    // get customer orders
    public getCustomerOrders(): Observable<Order[]> {
        let customerId = JSON.parse(localStorage.getItem("customerId"));
        return this.httpClient.get<Order[]>("http://localhost:3000/api/orders/" + customerId);
    }


    public createShoppingCart(cart): Observable<ShoppingCart> {
        return this.httpClient.post<ShoppingCart>("http://localhost:3000/api/carts", cart);
    }

    public getCustomer(id): Observable<Customer> {
        return this.httpClient.get<Customer>("http://localhost:3000/api/customers/" + id);
    }

    //  ADD ORDER
    public addOrder(order): Observable<Order> {
        return this.httpClient.post<Order>("http://localhost:3000/api/orders/", order);
    }


    public removeOneCartItem(id): Observable<Item> {
        return this.httpClient.delete<Item>("http://localhost:3000/api/cartItems/" + id);
    }

    public removeAllCartItems(id) {
        console.log(id)
        return this.httpClient.delete("http://localhost:3000/api/cartItems/deleteall/" + id);
    }

    public messageForCustomer() {
        let customerCart = JSON.parse(localStorage.getItem("customerId"));
        return this.httpClient.get<ShoppingCart>("http://localhost:3000/api/carts/" + customerCart);
    }

}
