import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomersService } from 'src/app/services/customers.service';
import { City } from 'src/app/models/city';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';

@Component({
    selector: 'order',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

    public cities: City[];
    public customer = new Customer();
    public item = new Item();
    public items: Item[];
    public totalPrice: number;
    public order = new Order();
    
    constructor(private redux: NgRedux<Store>,
        private http: HttpClient,
        private customersServics: CustomersService,
        private router: Router,
    
    ) { }

    ngOnInit() {
        const cities = this.customersServics.getCitiesList();
        cities.subscribe(city => {
            this.cities = city
        });

        let customerCart = this.customersServics.checkForCart();
        customerCart.subscribe(item => {
            this.items = item
            this.checkTotalPrice();
        })

        let currentCustomerFromLocalStorage = localStorage.getItem("customerId")
        currentCustomerFromLocalStorage = JSON.parse(currentCustomerFromLocalStorage);

        let currentCustomer = this.customersServics.getCustomer(currentCustomerFromLocalStorage);
        currentCustomer.subscribe(customer => {
            this.customer = customer;
        })

    }

    public checkTotalPrice() {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            total += (this.items[i].amount * this.items[i].price);
        }
        this.totalPrice = total;
    }

    public backToCart(): void {
        this.router.navigate(["home/shop"]);
    }

    public sendOrder(creditCard, date, houseNumber, street, city) {

        let currentCustomerFromLocalStorage = localStorage.getItem("newShoppingCart")
        currentCustomerFromLocalStorage = JSON.parse(currentCustomerFromLocalStorage);

        this.order.creditCard = creditCard;
        this.order.date = date;
        this.order.houseNumber = houseNumber;
        this.order.street = street;
        this.order.city = city;
        this.order.cartId = currentCustomerFromLocalStorage
        this.order.customerId = this.customer._id;
        this.order.finelPrice = this.totalPrice;

        let newOrder = this.customersServics.addOrder(this.order);
        newOrder.subscribe(customerOrder => {
            this.router.navigate(["home/shop/thank-you"]);
            localStorage.removeItem("newShoppingCart");
        });
    }

}
