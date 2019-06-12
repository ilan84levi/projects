import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { Product } from 'src/app/models/product';
import { Order } from 'src/app/models/order';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';
import { Item } from 'src/app/models/item';
import { ShoppingCart } from 'src/app/models/shoppingCart';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    public currentUser = new Customer();
    public customer = new Customer();
    public dynamicClass: { [cssClass: string]: boolean };
    public dynamicClassForm: { [cssClass: string]: boolean };
    public dynamicPanelCMessages: { [cssClass: string]: boolean };
    public dynamicPanelA: { [cssClass: string]: boolean };
    public dynamicHide: { [cssClass: string]: boolean };
    public dynamicResume: { [cssClass: string]: boolean };
    public dynamicStartShopping: { [cssClass: string]: boolean };
    public dynamicTotalPrice: { [cssClass: string]: boolean };
    public dynamicLastOrder: { [cssClass: string]: boolean };
    public currentCustomerFromStore: boolean;
    private unsubscribe: Unsubscribe;
    public allProducts: Product[];
    public allOrders: Order[];
    public cartItemsForMessage: Item[];
    public total: number;
    public customerCartDetails = new ShoppingCart();
    public customerCartDate: string;
    public customerOrders: Order[];
    public lastOrder: any;
    public messageForNewCustomer: string = "";

    constructor(private customersService: CustomersService,
        private redux: NgRedux<Store>,
        private http: HttpClient,
        private productsService: ProductsService,
        private router: Router
    ) { }

    ngOnInit() {

        let userFromLocal = localStorage.getItem("customerId");
        userFromLocal = JSON.parse(userFromLocal);

        if (userFromLocal) {
            this.dynamicClass = { "showForGuest": false, "hideForLoginCustomer": true };
            this.dynamicClassForm = { "login-form-hide": true, "login-form-show": false, "form-default-style": false };
            this.dynamicHide = { "panel-c-hide-element": true };
            this.dynamicLastOrder = { "h6-dynamicLastOrder": true , "h6-lastorder-hide":false};
            this.loginMessage();
        }
        else {
            this.dynamicClass = { "showForGuest": true, "hideForLoginCustomer": false };
            this.dynamicClassForm = { "form-default-style": true }
            this.dynamicHide = { "panel-c-hide-element": false };
            this.dynamicTotalPrice = { "totalPrice-h3": true };
            this.dynamicLastOrder = { "h6-dynamicLastOrder": false , "h6-lastorder-hide":true};
        }

        this.homePageUpload();

        const productsFromCollection = this.productsService.GetAllProducts();
        productsFromCollection.subscribe(product => {
            this.allProducts = product;
        });

        const ordersFromCollection = this.productsService.GetAllOrders();
        ordersFromCollection.subscribe(order => {
            this.allOrders = order;
        });

    }

    customerLogin(): void {
        this.customer._id = undefined;
        this.customer.firstName = undefined;
        this.customer.lastName = undefined;
        this.customer.city = undefined;
        this.customer.houseNumber = undefined;
        this.customer.street = undefined;
        this.customer.phone = undefined;

        this.customersService.checkCredintialsForCustomer(this.customer);

        let userFromLocal = localStorage.getItem("customerId");
        userFromLocal = JSON.parse(userFromLocal);
        this.unsubscribe = this.redux.subscribe(() => {
            let currentUser = this.redux.getState().isLoggedIn;
            if (currentUser === true || userFromLocal) {
                this.dynamicClass = { "showForGuest": false, "hideForLoginCustomer": true };
                this.ngOnInit();
            }
        });

    }

    public homePageUpload() {

        this.unsubscribe = this.redux.subscribe(() => {
            let customerFromStore = this.redux.getState().customerLoggedIn;
            if (customerFromStore === true) {

                this.dynamicClass = { "showForGuest": false, "hideForLoginCustomer": true };
                this.dynamicClassForm = { "login-form-hide": true, "login-form-show": false, "form-default-style": false }
                this.dynamicPanelCMessages = { "panel-a-afterLogin": true };
                this.dynamicHide = { "panel-c-hide-element": true };
                this.dynamicLastOrder = { "h6-dynamicLastOrder": true , "h6-lastorder-hide":false};

            }
            else {
 
                this.dynamicClass = { "showForGuest": true, "hideForLoginCustomer": false };
                this.dynamicClassForm = { "form-default-style": true }
                this.dynamicPanelCMessages = { "panel-a-afterLogin": false };
                this.dynamicHide = { "panel-c-hide-element": false };
                this.dynamicTotalPrice = { "totalPrice-h3": true };
                this.dynamicLastOrder = { "h6-dynamicLastOrder": false , "h6-lastorder-hide":true};
            
            }

        });
    }


    public loginMessage() {
        let cartId = JSON.parse(localStorage.getItem("newShoppingCart"));

        if (cartId) {

            let customerCart = this.customersService.checkForCart();
            customerCart.subscribe(items => {
                this.cartItemsForMessage = items
                this.showTotal(this.cartItemsForMessage);
                this.dynamicResume = { "resume-shopping": true, "startShopping": false, "resume-hide": false };
                this.dynamicHide = { "startShopping": false };
                this.dynamicTotalPrice = { "totalPrice-h3": false };
            });

            let customerCartDetails = this.customersService.getOneCartByCartId();
            customerCartDetails.subscribe(CustomerCart => {
                this.customerCartDetails = CustomerCart
                this.customerCartDate = CustomerCart[0].date;
                this.dynamicStartShopping = { "startShoppingBtn-hide": false , "startShopping":true};
            });

        }

        else if (!cartId) {

            let lastCustomerCart = this.customersService.getCustomerOrders();
            lastCustomerCart.subscribe(cart => {
                this.customerOrders = cart

                if (this.customerOrders.length > 0) {
                    let customerLastOrder = this.customerOrders[this.customerOrders.length - 1];
                    if (customerLastOrder !== undefined) {
                        this.lastOrder = customerLastOrder;
                        this.dynamicStartShopping = { "startShopping": true };
                        this.dynamicTotalPrice = { "totalPrice-h3": true };
                        this.dynamicLastOrder = { "h6-dynamicLastOrder": true , "h6-lastorder-hide":false};
                    }

                }

                else {

                    this.messageForNewCustomer = "wellcome to my store, start shopping ";
                    this.dynamicStartShopping = { "startShopping": true };
                    this.dynamicTotalPrice = { "totalPrice-h3": true };
                    
                }

            });

        }

    }

    public showTotal(items) {
        let myTotal = 0;
        if (items) {

            for (let i = 0; i < items.length; i++) {
                myTotal += (items[i].amount * items[i].price);
            }
            this.total = myTotal;

        }
    }

    public sendToStore():void{
        this.router.navigate(["/home/shop"]);
    }

    
    public ngOnDestroy(): void {
        this.unsubscribe();
    }

}
